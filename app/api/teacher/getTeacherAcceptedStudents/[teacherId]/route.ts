import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { teacherId: string } },
) => {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { error: "Trebuie să fiți autentificat!" },
      { status: 401 },
    );
  }
  try {
    const teacherAcceptedStudents = await db.teacherAcceptedStudents.findMany({
      where: {
        teacherId: params.teacherId,
      },
      include: {
        students: true,
      },
    });

    return NextResponse.json(teacherAcceptedStudents);
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
