"use server";
import { getCurrentUser } from "../getCurrentUser";

import db from "@/lib/db";

export const toggleTeacherDisponibility = async (
  maxNumberOfStudents: number,
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Nu sunteți autentificat!" };
  if (currentUser?.role !== "TEACHER")
    return { error: "Nu sunteți un mentor!" };

  try {
    const existingAviability = await db.teacherAcceptedStudents.findMany({
      where: {
        teacherId: currentUser.id,
      },
    });

    if (existingAviability[0]) {
      await db.teacherAcceptedStudents.updateMany({
        where: {
          teacherId: currentUser?.id,
        },
        data: {
          maxNumberOfStudents: maxNumberOfStudents,
        },
      });
    } else if (!existingAviability[0]) {
      await db.teacherAcceptedStudents.create({
        data: {
          teacherId: currentUser.id,
          maxNumberOfStudents: maxNumberOfStudents || 0,
          currentNumberOfStudents: 0,
        },
      });
    }
    return { success: "Disponibilitatea a fost actualizată!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
