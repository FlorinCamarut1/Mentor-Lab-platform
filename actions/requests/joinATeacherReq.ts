"use server";
import { auth } from "@/auth";
import { JoinRequestSchema } from "@/schemas";
import * as z from "zod";

import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function joinATeacherReq(
  values: z.infer<typeof JoinRequestSchema>,
  teacherId: string,
) {
  const session = await auth();

  if (session?.user?.role !== "STUDENT") {
    return { error: "Doar studenții pot aplica!" };
  }

  const parseValues = JoinRequestSchema.safeParse(values);
  if (!parseValues.success) {
    return { error: "Câmpuri invalide!" };
  }

  const { projectName, projectDescription } = parseValues.data;

  try {
    const isAlreadyTutored = await db.acceptedStudent.findMany({
      where: {
        studentId: session?.user?.id,
      },
    });

    if (isAlreadyTutored?.[0]) {
      return { error: "Ești înscris deja unui mentor!" };
    }

    const newRequest = await db.joinRequest.create({
      data: {
        studentId: session?.user?.id,
        teacherId,
        projectName,
        projectDescription,
        expires: new Date(Date.now() + 1000 * 60 * 1000),
      },
    });
    await db.notification.create({
      data: {
        body: projectName,
        notificationType: "REQUEST",
        notifyeeId: teacherId,
        notificatorId: session?.user?.id,
        notificatorUsername: session?.user?.name,
        targetId: newRequest.id,
      },
    });

    await pusherServer.trigger(teacherId, "notification:new", newRequest);

    return { success: "Ai aplicat cu success!", newRequest };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
}
