"use client";
import { cn } from "@/lib/utils";
import { Message, useChat } from "ai/react";
import { Button } from "../ui/button";
import { IoCloseSharp } from "react-icons/io5";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { SiProbot } from "react-icons/si";
import { FaTrash } from "react-icons/fa6";
import { CiStop1 } from "react-icons/ci";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface AiChatBotProps {
  open: boolean;
  onClose: () => void;
}

const AiChatBox = ({ open, onClose }: AiChatBotProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
    stop,
  } = useChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";
  return (
    <div
      className={cn(
        "relative bottom-0 right-0 z-50 w-full max-w-[500px] rounded-md p-1 xl:right-20",
        open ? "fixed" : "hidden",
      )}
    >
      <div className="absolute right-0 top-0 flex w-full justify-end p-2">
        <Button
          className="rounded-full px-2 py-1"
          variant="ghost"
          onClick={onClose}
        >
          <IoCloseSharp size={20} />
        </Button>
      </div>
      <div className="flex h-[600px] flex-col rounded-md border bg-background shadow-xl">
        <div
          className="mt-3 h-full overflow-y-auto px-3 scrollbar scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full"
          ref={scrollRef}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{ role: "assistant", content: "Mă gândesc..." }}
            />
          )}
          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Ceva a mers greșit...încearcă din nou.",
              }}
            />
          )}
          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center gap-3">
              <SiProbot />
              Pune o întrebare asistentului inteligent 😊
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="m-3 flex gap-1">
          <Button
            title="Șterge conversația"
            variant="destructive"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <FaTrash />
          </Button>
          <div className="flex-1">
            {!isLoading && (
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="întreabă-mă ceva..."
                ref={inputRef}
              />
            )}
            {isLoading && (
              <Button variant="outline">
                <CiStop1 />
              </Button>
            )}
          </div>
          <Button type="submit" disabled={isLoading} className="flex-none">
            {isLoading ? "Se încarcă..." : "Trimite"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AiChatBox;

function ChatMessage({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) {
  const session = useSession();

  const isAiMessage = role === "assistant";
  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "me-5 justify-start" : "ms-5 justify-end",
      )}
    >
      {isAiMessage && <SiProbot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground",
        )}
      >
        {content}
      </p>
      {!isAiMessage && session.data?.user?.image && (
        <Image
          src={session.data?.user?.image}
          alt="User image"
          width={100}
          height={100}
          className="ml-2 h-10 w-10 rounded-full object-cover"
        />
      )}
    </div>
  );
}
