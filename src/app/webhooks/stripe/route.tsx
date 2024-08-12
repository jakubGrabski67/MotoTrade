import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const event = await stripe.webhooks.constructEvent(
      await req.text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "charge.succeeded") {
      const charge = event.data.object;
      const carId = charge.metadata.carId;
      const email = charge.billing_details.email;
      const pricePaidInCents = charge.amount;

      const car = await db.car.findUnique({ where: { id: carId } });
      if (car == null || email == null) {
        return new NextResponse("Bad Request", { status: 400 });
      }

      const userFields = {
        email,
        orders: { create: { carId, pricePaidInCents } },
      };

      const {
        orders: [order],
      } = await db.user.upsert({
        where: { email },
        create: userFields,
        update: userFields,
        select: { orders: { orderBy: { createdAt: "desc" }, take: 1 } },
      });

      const downloadVerification = await db.downloadVerification.create({
        data: {
          carId,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      await resend.emails.send({
        from: `Support <${process.env.SENDER_EMAIL}>`,
        to: email,
        subject: "Order confirmation",
        react: <h1>Test</h1>,
      });

      return NextResponse.json({ success: true }); // Odpowiedź po poprawnym zakończeniu
    } else {
      return NextResponse.json({ message: "Unhandled event type" }); // Odpowiedź dla innych zdarzeń
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
