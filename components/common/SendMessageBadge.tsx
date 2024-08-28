"use client";
import React, { useActionState, useTransition } from "react";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { MessageCircleIcon } from "lucide-react";
import { createConversation } from "@/actions/conversation/createConversation";

import toast from "react-hot-toast";

interface SendMessageBadgeProps {
  sendMessageTo: string;
}

const SendMessageBadge = ({ sendMessageTo }: SendMessageBadgeProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const startConversationHandler = () => {
    startTransition(() => {
      createConversation(sendMessageTo).then((res) => {
        if (res.success) {
          router.push(`/conversations?conversation=${res?.conversation?.id}`);
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  return (
    <Badge
      className="absolute right-2 top-2 cursor-pointer rounded-full bg-primary px-2 py-1"
      onClick={startConversationHandler}
    >
      Trimite un mesaj
      <MessageCircleIcon size={20} className="ml-2" />
    </Badge>
  );
};

export default SendMessageBadge;
