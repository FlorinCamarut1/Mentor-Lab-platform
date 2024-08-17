"use client";
import Link from "next/link";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { navLinkData } from "@/data/navigationData";
import { NavLink } from "./NavLink";
import { signOut, useSession } from "next-auth/react";
import { User } from "@prisma/client";

import MobileInviteCodeDrawer from "../admin/Invitations/MobileInviteCodeDrawer";
interface MainNavigationProps {
  currentUserData: User | null;
}

export default function MainNavigation({
  currentUserData,
}: MainNavigationProps) {
  return (
    <header className="grid h-20 w-full grid-cols-3 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Link href="/my-profile" prefetch={false}>
                <Avatar>
                  <AvatarImage
                    src={`${currentUserData?.image || "/images/placeholder.png"}`}
                    alt="avatar image"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <SheetTitle className="text-sm text-gray-600">
                {currentUserData?.name}
              </SheetTitle>
            </div>
            <SheetDescription className="pr-4">
              {currentUserData?.role}
            </SheetDescription>
          </div>

          <div className="grid gap-2 py-6">
            {navLinkData.map((navLink) => (
              <NavLink key={navLink.id} navLinkData={navLink} isMobile={true} />
            ))}
            {currentUserData?.role === "ADMIN" && <MobileInviteCodeDrawer />}
            {currentUserData && (
              <Button
                className="w-[120px]"
                variant="outline"
                onClick={() => {
                  signOut();
                }}
              >
                Deconectare
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
      {currentUserData && (
        //
        <div className="flex items-center gap-2">
          <Link
            href="/my-profile"
            className="mr-6 hidden lg:flex"
            prefetch={false}
          >
            <Avatar>
              <AvatarImage
                src={`${currentUserData?.image || "/images/placeholder.png"}`}
                alt="avatar image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div className="hidden items-center justify-center gap-1 lg:flex">
            <h4 className="font-semibold text-gray-600">Welcome:</h4>
            <p className="text-gray-400">{currentUserData?.name}</p>
          </div>
        </div>
      )}
      <div className="flex w-full justify-center">
        <ul className="hidden lg:flex">
          {navLinkData.map((navLink) => (
            <li key={navLink.id}>
              <NavLink navLinkData={navLink} isMobile={false} />
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-auto w-fit">
        {!currentUserData && (
          <NavLink
            navLinkData={{ id: 0, title: "Logare", href: "/auth/login" }}
          />
        )}
        {currentUserData && (
          <Button
            className="hidden lg:block"
            variant="outline"
            onClick={() => {
              signOut();
            }}
          >
            Deconectare
          </Button>
        )}
      </div>
    </header>
  );
}

function MenuIcon({ ...props }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
