import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@/auth";

export const GET = async (req: NextRequest) => {
  if (req.method !== "GET")
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });

  const session = await auth();

  if (!session)
    return NextResponse.json(
      { error: "Trebuie să fiți autentificat!" },
      { status: 401 },
    );

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
      where: {
        NOT: [
          {
            role: "ADMIN",
          },
          {
            id: session?.user?.id,
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 500 },
    );
  }
};
