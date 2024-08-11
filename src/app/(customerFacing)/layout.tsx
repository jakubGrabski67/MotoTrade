import { Nav, NavLink } from "@/components/Nav"

export const dynamic = "force-dynamic"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>
    <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/cars">Cars</NavLink>
        <NavLink href="/orders">My orders</NavLink>
    </Nav>
    <div className="container my-6">{children}</div>
    </>
}