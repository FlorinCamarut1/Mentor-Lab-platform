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
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { FaGraduationCap } from "react-icons/fa6";
import { useState } from "react";

import MobileInviteCodeDrawer from "../admin/Invitations/MobileInviteCodeDrawer";
import AiChatButton from "../openAiChat/AiChatButton";
import { NavLinksTypes } from "@/types";

interface MainNavigationProps {
  currentUserData: User | null;
}

export default function MainNavigation({
  currentUserData,
}: MainNavigationProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="flex h-20 w-full items-center px-4 md:px-6 lg:grid lg:grid-cols-3">
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {currentUserData ? (
                <Link href="/my-profile" prefetch={false}>
                  <Avatar>
                    <AvatarImage
                      src={`${currentUserData?.image || "/images/placeholder.png"}`}
                      alt="avatar image"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <FaGraduationCap size={30} />
              )}

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
              <NavLink
                key={navLink.id}
                navLinkData={navLink as NavLinksTypes}
                isMobile={true}
                currentUserData={currentUserData}
                onClick={() => setSheetOpen(false)}
              />
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
      {currentUserData ? (
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
          <div className="hidden items-center justify-center gap-1 xl:flex">
            <h4 className="font-semibold text-gray-600 md:text-xs xl:text-base">
              Welcome:
            </h4>
            <p className="text-gray-400">{currentUserData?.name}</p>
          </div>
        </div>
      ) : (
        <FaGraduationCap size={30} className="hidden lg:block" />
      )}
      <div className="flex w-full justify-center">
        <ul className="hidden gap-1 lg:flex">
          {navLinkData.map((navLink) => (
            <li key={navLink.id}>
              <NavLink
                navLinkData={navLink as NavLinksTypes}
                isMobile={false}
                currentUserData={currentUserData}
              />
            </li>
          ))}
          {currentUserData && (
            <li>
              <AiChatButton />
            </li>
          )}
        </ul>
      </div>
      <div className="ml-auto w-fit">
        {!currentUserData && (
          <NavLink
            navLinkData={
              {
                id: 0,
                title: "Logare",
                href: "/auth/login",
                role: [undefined],
              } as NavLinksTypes
            }
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
      {currentUserData && (
        <div className="flex lg:hidden">
          <AiChatButton />
        </div>
      )}
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
