"use server";

import db from "@/lib/db";
import { getCurrentUser } from "../getCurrentUser";

export const acceptRequest = async (requestId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "Nu sunteți autentificat!" };
  }

  if (currentUser?.role !== "TEACHER") {
    return { error: "Nu sunteți un mentor!" };
  }

  try {
    const request = await db.joinRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      return { error: "Cerea nu există!" };
    }

    const existingTeacherAcceptedStudents =
      await db.teacherAcceptedStudents.findMany({
        where: {
          teacherId: currentUser.id,
        },
      });

    if (!existingTeacherAcceptedStudents[0]) {
      return {
        error:
          "Vă rugăm să bifați disponibilitatea Dumneavoastră și un număr maxim de studenți pe care doriți să îi mentorați!",
      };
    }
    if (
      existingTeacherAcceptedStudents[0].maxNumberOfStudents ===
      existingTeacherAcceptedStudents[0].currentNumberOfStudents
    ) {
      return { error: "Ai atins numărul maxim de studenți acceptați" };
    }

    await db.acceptedStudent.create({
      data: {
        studentId: request.studentId,
        projectName: request.projectName,
        projectDescription: request.projectDescription,
        teamId: existingTeacherAcceptedStudents?.[0]?.id,
      },
    });

    await db.teacherAcceptedStudents.update({
      where: {
        id: existingTeacherAcceptedStudents[0].id,
      },
      data: {
        currentNumberOfStudents:
          existingTeacherAcceptedStudents[0].currentNumberOfStudents + 1,
      },
    });
    return { success: "Studentul a fost acceptat!" };
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
