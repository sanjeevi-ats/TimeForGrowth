"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function PublicLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Paths where the public Header and Footer should be HIDDEN
  const isHiddenRoute = 
    pathname?.startsWith("/admin") || 
    pathname?.startsWith("/studio");

  if (isHiddenRoute) {
    return null;
  }

  return <>{children}</>;
}
