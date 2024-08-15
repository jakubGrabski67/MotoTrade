import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const car = await db.car.findUnique({
    where: { id },
  });
  if (car == null) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: car.priceInCents,
    currency: "USD",
    metadata: { carId: car.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }

  return <CheckoutForm car={car} clientSecret={paymentIntent.client_secret} />;
}
