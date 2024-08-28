import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { conversationId: string } },
) => {
  if (request.method !== "GET") {
    return NextResponse.json({ error: "Metodă nepermisa!" }, { status: 405 });
  }
  const currentUser = await getCurrentUser();

  try {
    const currentConversation = await db.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
      include: {
        messages: true,
        users: {
          where: {
            NOT: {
              id: currentUser?.id,
            },
          },
        },
      },
    });

    return NextResponse.json(currentConversation);
  } catch (error) {
    return NextResponse.json(
      { error: "Nu am putut accesa conversatia!" },
      { status: 400 },
    );
  }
};
