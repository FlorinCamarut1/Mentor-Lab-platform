"use client";

import { IoMdArrowRoundBack } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";
import { useConversationById } from "@/hooks/conversation/useConversationById";
import { pusherClient } from "@/lib/pusher";
import { useMyConversations } from "@/hooks/conversation/useMyConversations";

import useConversationStore from "@/store/conversationStore";
import Message from "./Message";

import SendMessageForm from "./SendMessageForm";
import { ScrollArea } from "../ui/scroll-area";

interface ConversationContainerProps {
  currentUser: User;
}

const ConversationContainer = ({ currentUser }: ConversationContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const conversationId = useSearchParams().get("conversation") as string;
  const conversationStore = useConversationStore();

  const { data: currentConversationData, mutate: mutateCurrentConversation } =
    useConversationById(conversationId);
  const { mutate: mutateMyConversations } = useMyConversations();

  useEffect(() => {
    if (conversationId) {
      pusherClient.subscribe(conversationId);
      pusherClient.bind("messages:new", () => {
        mutateCurrentConversation();
        mutateMyConversations();
        scrollToBottom();
      });
      return () => {
        pusherClient.unsubscribe(conversationId);
        pusherClient.unbind("messages:new");
      };
    }
  }, [conversationId, mutateCurrentConversation, mutateMyConversations]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversationData?.messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  if (!conversationId)
    return (
      <div className="h-full w-full text-center text-xl text-gray-700">
        Începe o conversație
      </div>
    );

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md border-[1px] lg:max-h-[600px]">
      {/* Main message container */}
      <div className="flex items-center gap-2 bg-gray-100 p-2 shadow-sm">
        <Avatar>
          <AvatarImage
            src={
              currentConversationData?.users?.[0].image ||
              "/images/placeholder.png"
            }
            alt="avatar image"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3>{currentConversationData?.users?.[0].name}</h3>
      </div>

      <ScrollArea>
        <div className="flex flex-col gap-2 p-2" ref={scrollRef}>
          {currentConversationData?.messages?.map((message) => (
            <Message
              key={message.id}
              messageData={message}
              currentUser={currentUser}
              receiver={currentConversationData?.users?.[0]}
            />
          ))}
        </div>
      </ScrollArea>

      <SendMessageForm
        conversationId={conversationId}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
};

export default ConversationContainer;
