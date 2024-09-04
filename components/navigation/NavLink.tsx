"use client";

import { usePathname } from "next/navigation";
import { NavLinksTypes } from "@/types";
import { User } from "@prisma/client";

import React, { MouseEventHandler, useEffect } from "react";

import clsx from "clsx";
import Link from "next/link";

export interface NavLinkProps
  extends React.LinkHTMLAttributes<HTMLLinkElement> {
  isMobile?: boolean;
  navLinkData: NavLinksTypes;
  currentUserData?: User | null;
}
const NavLink = React.forwardRef<HTMLLinkElement, NavLinkProps>(
  ({ className, navLinkData, isMobile, onClick, currentUserData }, ref) => {
    const pathname = usePathname();
    const isActive = pathname === navLinkData.href;
    const roleBasedRoutes = navLinkData?.role?.some(
      (role) => currentUserData?.role === role,
    );

    useEffect(() => {
      if (isActive) {
        document.title = navLinkData.title;
      } else {
        document.title = "Mentor-Lab";
      }
    }, [navLinkData.title, isActive]);

    if (!currentUserData && navLinkData.protected) return null;
    if (!roleBasedRoutes) return null;

    return (
      <Link
        onClick={onClick as MouseEventHandler}
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
