"use client";
import React from "react";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { MessageCircleIcon } from "lucide-react";

interface SendMessageBadgeProps {
  sendMessageTo: string;
}

const SendMessageBadge = ({ sendMessageTo }: SendMessageBadgeProps) => {
  const router = useRouter();
  return (
    <Badge
      className="absolute right-2 top-2 cursor-pointer rounded-full bg-primary px-2 py-1"
      onClick={() => router.push(`/messages/${sendMessageTo}`)}
    >
      Trimite un mesaj
      <MessageCircleIcon size={20} className="ml-2" />
    </Badge>
  );
};

export default SendMessageBadge;
