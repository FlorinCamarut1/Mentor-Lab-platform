"use server";

import { getCurrentUser } from "../getCurrentUser";
import db from "@/lib/db";

export const deleteAllMyNotifications = async () => {
  const currentUser = await getCurrentUser();
  try {
    await db.notification.deleteMany({
      where: {
        notifyeeId: currentUser?.id,
      },
    });
    return { success: "Toate notificările au fost șterse cu succes!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
