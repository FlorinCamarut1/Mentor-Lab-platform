"use server";

import { getCurrentUser } from "../getCurrentUser";
import { pusherServer } from "@/lib/pusher";

import db from "@/lib/db";

export const sendMessage = async (
  conversationId: string,
  message: string,
  image?: string,
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { error: "Nu sunteți autentificat!" };
  try {
    const currentConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      select: {
        userIds: true,
      },
    });

    const notifyeeId = currentConversation?.userIds.filter(
      (id) => id !== currentUser?.id,
    );

    const newMessage = await db.message.create({
      data: {
        conversationId: conversationId,
        senderId: currentUser?.id,
        body: message,
        image: image,
      },
    });

    if (!notifyeeId) return { error: "Nu exista mesageri!" };
    const notification = await db.notification.create({
      data: {
        notifyeeId: notifyeeId[0],
        notificationType: "MESSAGE",
        notificatorId: currentUser?.id,
        body: message,
        notificatorUsername: currentUser?.name,
        targetId: conversationId,
      },
    });

    await pusherServer.trigger(notifyeeId[0], "notification:new", notification);
    await pusherServer.trigger(conversationId, "messages:new", newMessage);
    return { success: "Mesajul a fost trimis cu succes!", newMessage };
  } catch (error) {}
};
