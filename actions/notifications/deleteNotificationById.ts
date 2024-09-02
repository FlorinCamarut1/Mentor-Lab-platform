"use server";

import db from "@/lib/db";

export const deleteNotificationById = async (notificationId: string) => {
  try {
    await db.notification.delete({
      where: {
        id: notificationId,
      },
    });

    return { success: "Notificare ștearsă cu succes!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
