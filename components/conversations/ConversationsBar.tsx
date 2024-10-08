"use client";

import { useMyConversations } from "@/hooks/conversation/useMyConversations";
import { Conversation, Message, User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { ScrollArea } from "../ui/scroll-area";
import { useCurrentUserData } from "@/hooks/users/useCurrentUserData";
import React, { useEffect } from "react";

import ConversationBarItem from "./ConversationBarItem";

const ConversationsBar = () => {
  const { data: allConversationsData, mutate: mutateConversations } =
    useMyConversations();
  const { data: currentUser } = useCurrentUserData();

  useEffect(() => {
    if (!currentUser) return;
    pusherClient.subscribe(currentUser?.id as string);
    pusherClient.bind("conversation:new", () => {
      mutateConversations();
    });
    return () => {
      pusherClient.unsubscribe(currentUser?.id as string);
      pusherClient.unbind("conversation:new");
    };
  });
  if (allConversationsData?.length === 0)
    return (
      <h2 className="text-center text-xl text-gray-500">
        Nu există conversații!
      </h2>
    );

  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      <div className="grid grid-cols-1 gap-2">
        {allConversationsData?.map(
          (
            conversation: Conversation & {
              users: User[];
              messages: Message[];
            },
          ) => (
            <ConversationBarItem
              key={conversation.id}
              conversation={conversation}
            />
          ),
        )}
      </div>
    </ScrollArea>
  );
};

export default ConversationsBar;
