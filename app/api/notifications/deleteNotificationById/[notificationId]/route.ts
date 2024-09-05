import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { notificationId: string } },
) => {
  const notificationId = params.notificationId;
  try {
    await db.notification.delete({
      where: {
        id: notificationId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
