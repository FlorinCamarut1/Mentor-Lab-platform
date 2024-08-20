import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "react-hot-toast";
import { User } from "@prisma/client";

import MainNavigation from "@/components/navigation/MainNavigation";
import AiChatButton from "@/components/openAiChat/AiChatButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mentor Lab",
  description: "Găsește mentorul perfect pentru tine!",
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="ro">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <div className="relative h-screen">
            <Toaster />
            <MainNavigation currentUserData={session?.user as User} />
            {children}
          </div>
        </body>
      </SessionProvider>
    </html>
  );
}
