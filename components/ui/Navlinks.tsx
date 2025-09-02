// app/components/Links.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { navLinks } from "@/data/navLinks";

type Props = {
  linkClassName?: string;
  activeClassName?: string;
};

export function Links({
  linkClassName = "",
  activeClassName = "active",
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={href}
            href={href}
            className={`${linkClassName} ${isActive ? activeClassName : ""}`}
            data-active={isActive ? "true" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </>
  );
}
