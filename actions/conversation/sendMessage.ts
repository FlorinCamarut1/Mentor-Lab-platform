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
    const newMessage = await db.message.create({
      data: {
        conversationId: conversationId,
        senderId: currentUser?.id,
        body: message,
        image: image,
      },
    });
    await pusherServer.trigger(conversationId, "messages:new", newMessage);
    return { success: "Mesajul a fost trimis cu succes!", newMessage };
  } catch (error) {}
};
