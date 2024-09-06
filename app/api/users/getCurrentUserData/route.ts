import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import db from "@/lib/db";

export const GET = async (req: NextRequest) => {
  const session = await auth();

  try {
    const currentUser = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        CV: true,
        accounts: true,
      },
    });

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Ceva nu a mers bine!", status: 500 });
  }
};
