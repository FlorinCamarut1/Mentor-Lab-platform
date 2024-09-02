"use server";

import { pusherServer } from "@/lib/pusher";
import { getCurrentUser } from "../getCurrentUser";
import db from "@/lib/db";

export const declineRequest = async (reqId: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "Nu sunteți autentificat!" };
  }

  try {
    if (currentUser.role !== "TEACHER") {
      return { error: "Nu sunteți un mentor!" };
    }

    const request = await db.joinRequest.findUnique({
      where: {
        id: reqId,
      },
    });

    if (request?.teacherId !== currentUser.id) {
      return { error: "Nu sunteți autorizat!" };
    }

    const updatedRequest = await db.joinRequest.update({
      where: {
        id: reqId,
      },
      data: {
        status: "DECLINED",
      },
    });

    await db.notification.create({
      data: {
        notifyeeId: request?.studentId,
        body: request?.projectName,
        notificationType: "REQUEST_DECLINED",
        notificatorId: currentUser?.id,
        notificatorUsername: currentUser?.name,
      },
    });

    pusherServer.trigger(
      request?.studentId,
      "notification:new",
      updatedRequest,
    );

    return { success: "Cerere refuzată!", updatedRequest };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
