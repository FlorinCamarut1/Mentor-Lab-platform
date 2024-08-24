"use server";
import { auth } from "@/auth";
import { JoinRequestSchema } from "@/schemas";
import * as z from "zod";

import db from "@/lib/db";

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
    await db.joinRequest.create({
      data: {
        studentId: session?.user?.id,
        teacherId,
        projectName,
        projectDescription,
        expires: new Date(Date.now() + 1000 * 60 * 1000),
      },
    });
    return { success: "Ai aplicat cu success!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }

  // todo: check if you already applied and teacher is avaible
}
