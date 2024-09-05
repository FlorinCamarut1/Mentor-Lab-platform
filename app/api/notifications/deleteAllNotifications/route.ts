import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";
export const DELETE = async (req: NextRequest) => {
  const currentUser = await getCurrentUser();

  try {
    await db.notification.deleteMany({
      where: {
        notifyeeId: currentUser?.id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    NextResponse.json({ error: "Ceva nu a mers bine!" }, { status: 500 });
  }
};
