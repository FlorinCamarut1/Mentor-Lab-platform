import { auth } from "@/auth";
import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }
  try {
    const session = await auth();

    if (session?.user?.role !== "ADMIN")
      return new Response(null, { status: 401 });

    const inviteTokens = await db.inviteToken.findMany({
      orderBy: {
        expires: "asc",
      },
    });

    const tokenExpired = inviteTokens.filter((token) => {
      return token.expires.getTime() < Date.now();
    });

    if (tokenExpired) {
      await db.inviteToken.deleteMany({
        where: {
          expires: {
            lt: new Date(),
          },
        },
      });
    }

    return NextResponse.json(inviteTokens, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Nu s-au putut extrage token-urile" },
      { status: 500 },
    );
  }
}
