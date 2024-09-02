import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export const GET = async (req: NextRequest) => {
  if (req.method !== "GET") {
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
    const userNotifications = await db.user.findUnique({
      where: {
        id: currentUser?.id,
      },
      select: {
        notifications: true,
      },
    });

    return NextResponse.json(userNotifications?.notifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
