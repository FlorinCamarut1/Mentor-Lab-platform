import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Trebuie să fiți autentificat!" },
      { status: 401 },
    );
  }

  if (currentUser?.role !== "STUDENT") {
    return NextResponse.json({ error: "Nu sunteti student!" });
  }

  try {
    const currentAcceptedStudent = await db.user.findUnique({
      where: {
        id: currentUser?.id,
      },
      select: {
        AcceptedStudent: true,
      },
    });
    const currentStudentTeacher = await db.user.findUnique({
      where: {
        id: currentAcceptedStudent?.AcceptedStudent?.teacherId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        phoneNumber: true,
        CV: true,
        gitHubUrl: true,
        facebookUrl: true,
        linkedlnUrl: true,
      },
    });
    if (!currentStudentTeacher) {
      return NextResponse.json(
        { error: "Nu sunteți înscris unui mentor!" },
        { status: 401 },
      );
    }

    return NextResponse.json(currentStudentTeacher);
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
