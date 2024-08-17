"use server";
import { v4 as uuidv4 } from "uuid";
import { auth } from "@/auth";

import db from "@/lib/db";

export const generateInviteToken = async () => {
  const session = await auth();

  if (session?.user?.role !== "ADMIN")
    return { error: "Nu aveti permisiunea de a genera token-urile!" };

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 15 * 60 * 1000);

  try {
    await db.inviteToken.create({
      data: {
        token,
        expires,
      },
    });
    return { success: "Token genereat cu succes!", token, expires };
  } catch (error) {
    return { error: "Nu s-au putut genera token-urile" };
  }
};
