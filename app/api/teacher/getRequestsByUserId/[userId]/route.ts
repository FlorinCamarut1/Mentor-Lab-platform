import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export const GET = async (
  request: NextRequest,
  { params }: { params: { userId: string } },
) => {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }
  const currentUser = await getCurrentUser();
  try {
    await db.joinRequest.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
      },
    });
    if (currentUser?.role === "TEACHER") {
      const studentRequests = await db.joinRequest.findMany({
        where: {
          teacherId: params.userId,
          status: "PENDING",
        },
      });

      return NextResponse.json(studentRequests);
    } else if (
      currentUser?.role === "STUDENT" &&
      currentUser?.id !== params.userId
    ) {
      const request = await db.joinRequest.findMany({
        where: {
          teacherId: params.userId,
          studentId: currentUser?.id,
        },
      });

      return NextResponse.json(request);
    } else if (
      currentUser?.role === "STUDENT" &&
      currentUser?.id === params.userId
    ) {
      const studentRequests = await db.joinRequest.findMany({
        where: {
          studentId: params.userId,
        },
      });

      return NextResponse.json(studentRequests);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
