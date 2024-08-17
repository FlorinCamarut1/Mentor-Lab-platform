"use server";

import { auth } from "@/auth";

import db from "@/lib/db";

export const deleteInviteToken = async (inviteTokenId: string) => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: "Nu aveti permisiunea de a sterge token-urile!" };
  }

  try {
    const inviteToken = await db.inviteToken.findUnique({
      where: {
        id: inviteTokenId,
      },
    });

    if (!inviteToken) {
      return { error: "Token inexistent sau expirat!" };
    }

    await db.inviteToken.deleteMany({
      where: {
        id: inviteTokenId,
      },
    });
    return { success: "Token șters cu succes!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
