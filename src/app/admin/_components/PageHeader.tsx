import { ReactNode } from "react";

export function PageHeader({children}: {children: ReactNode}) {
return <h1 className="text-4xl mb-1">{children}</h1>
}