"use server";

import { pusherServer } from "@/lib/pusher";
import { getCurrentUser } from "../getCurrentUser";

import db from "@/lib/db";

export const createConversation = async (recipientId: string) => {
  const currentUser = await getCurrentUser();

  let conversation;
  try {
    const existingConversation = await db.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser?.id as string, recipientId],
            },
          },
          {
            userIds: {
              equals: [recipientId, currentUser?.id as string],
            },
          },
        ],
      },
    });

    if (existingConversation[0]) {
      conversation = existingConversation[0];

      return { success: "Conversația deja există", conversation };
    } else {
      const newConversation = await db.conversation.create({
        data: {
          createdAt: new Date(),
          userIds: [currentUser?.id as string, recipientId],
        },
      });

      conversation = newConversation;
      await pusherServer.trigger(recipientId, "conversation:new", conversation);

      return { success: "Conversația a fost creată", conversation };
    }
  } catch (error) {
    return { error: "Ceva nu a mers bine!" };
  }
};
