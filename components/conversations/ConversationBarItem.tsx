"use client";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Conversation, Message, User } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import useConversationStore from "@/store/conversationStore";

interface ConversationBarItemProps {
  conversation: Conversation & { users: User[]; messages: Message[] };
}

const ConversationBarItem = ({ conversation }: ConversationBarItemProps) => {
  let lastMessageToDisplay;

  if (
    !conversation?.messages?.[0]?.body &&
    !conversation?.messages?.[0]?.image
  ) {
    lastMessageToDisplay = "Trimite un mesaj...";
  } else if (
    !conversation?.messages?.[0]?.body &&
    conversation?.messages?.[0]?.image
  ) {
    lastMessageToDisplay = "A trimis un atașament...";
  } else {
    lastMessageToDisplay = conversation?.messages?.[0]?.body;
  }

  const conversationStore = useConversationStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const setSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const handleClickOnConversation = () => {
    setSearchParams("conversation", conversation.id);
    conversationStore.setMobileConversationBoxOpen(
      !conversationStore.mobileConversationBoxOpen,
    );
  };

  return (
    <div
      className="flex w-full cursor-pointer gap-2 rounded-md border p-2 transition hover:bg-gray-100"
      onClick={handleClickOnConversation}
    >
      <Avatar>
        <AvatarImage
          src={conversation?.users?.[0]?.image || "/images/placeholder.png"}
          alt="avatar image"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center overflow-hidden">
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold">
          {conversation?.users?.[0]?.name}
        </p>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-gray-500">
          {lastMessageToDisplay}
        </p>
      </div>
    </div>
  );
};

export default ConversationBarItem;
