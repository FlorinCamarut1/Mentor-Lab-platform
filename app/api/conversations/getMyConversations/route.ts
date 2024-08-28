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
    const myConversations = await db.conversation.findMany({
      where: {
        userIds: {
          has: currentUser?.id,
        },
      },
      include: {
        users: {
          where: {
            NOT: {
              id: currentUser?.id,
            },
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return NextResponse.json(myConversations);
  } catch (error) {
    return NextResponse.json(
      { error: "Ceva nu a mers bine!" },
      { status: 400 },
    );
  }
};
