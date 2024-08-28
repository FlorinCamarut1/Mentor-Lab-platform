"use client";

import { useMyConversations } from "@/hooks/conversation/useMyConversations";
import { Conversation, Message, User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import { useSession } from "next-auth/react";

import React, { useEffect } from "react";
import ConversationBarItem from "./ConversationBarItem";

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
    <div className="h-full w-full rounded-md border scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full lg:max-h-[600px] lg:min-h-[600px] lg:w-96">
      <div className="m-4 flex flex-col gap-2">
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
    </div>
  );
};

export default ConversationsBar;
