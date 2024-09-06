import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import { getUserByEmail, getUserById } from "@/lib/dbUtils";
import { LoginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log(account);
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      if (!existingUser) {
        return false;
      }
      return true;
    },
    async session({ token, session }) {
      if (token.pdfHostedUrl) {
        session.user.pdfHostedUrl = token.pdfHostedUrl as string;
      }
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.image = token.picture;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      if (existingUser.CV.length > 0) {
        token.pdfHostedUrl = existingUser.CV[0].pdfHostedUrl;
      }
      token.picture = existingUser.image;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role as UserRole;

      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
