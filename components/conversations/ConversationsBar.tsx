"use client";

import { useMyConversations } from "@/hooks/conversation/useMyConversations";
import { Conversation, Message, User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";

import React, { useEffect } from "react";
import ConversationBarItem from "./ConversationBarItem";
import { ScrollArea } from "../ui/scroll-area";

const ConversationsBar = ({ currentUser }: { currentUser: User }) => {
  const { data: allConversationsData, mutate: mutateConversations } =
    useMyConversations();

  useEffect(() => {
    pusherClient.subscribe(currentUser?.id as string);
    pusherClient.bind("conversation:new", () => {
      mutateConversations();
    });
    return () => {
      pusherClient.unsubscribe(currentUser?.id as string);
      pusherClient.unbind("conversation:new");
    };
  });

  return (
    <ScrollArea className="h-full w-full rounded-md border p-4">
      <div className="flex flex-col gap-2">
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
