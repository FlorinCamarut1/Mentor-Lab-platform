"use server";

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

    await db.joinRequest.update({
      where: {
        id: reqId,
      },
      data: {
        status: "DECLINED",
      },
    });

    return { success: "Cerere refuzată!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
