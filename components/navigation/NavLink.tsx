"use client";

import { usePathname } from "next/navigation";

import clsx from "clsx";
import Link from "next/link";
import React from "react";

export interface NavLinkProps
  extends React.LinkHTMLAttributes<HTMLLinkElement> {
  isMobile?: boolean;
  navLinkData: {
    id: number;
    title: string;
    href: string;
  };
}
const NavLink = React.forwardRef<HTMLLinkElement, NavLinkProps>(
  ({ className, navLinkData, isMobile }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === navLinkData.href;

    return (
      <Link
        href={navLinkData.href}
        className={clsx(
          isMobile
            ? "flex w-full items-center py-2 text-lg font-semibold"
            : "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          `${isActive ? "rounded-sm bg-accent px-2 text-accent-foreground lg:px-4" : ""}`,
        )}
        prefetch={false}
      >
        {navLinkData.title}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";
export { NavLink };
