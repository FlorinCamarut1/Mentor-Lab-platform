import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

import db from "@/lib/db";

export const GET = async (req: NextRequest, context: Context) => {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }

  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { error: "Trebuie să fiți autentificat!" },
      { status: 401 },
    );
  }

  const userEmail = context.params?.email;

  if (!userEmail) {
    return NextResponse.json({ error: "Necorespunzator!" }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        CV: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Nu am putut găsi userul!" },
      { status: 400 },
    );
  }
};
