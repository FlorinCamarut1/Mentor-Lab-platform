import { CV } from "@prisma/client";
// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { CV, UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: UserRole;
      pdfHostedUrl?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: UserRole;
    pdfHostedUrl?: string;
  }
}
