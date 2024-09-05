"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message as MessageType, User } from "@prisma/client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { FaFile } from "react-icons/fa";
import { Session } from "next-auth";

import timeElapsedSince from "@/utils/timeElapseSince";
import Link from "next/link";

interface MessageProps {
  messageData: MessageType;
  currentUser: Session["user"];
  receiver: User;
  isLastMessage: boolean;
}

const Message = ({
  messageData,
  currentUser,
  receiver,
  isLastMessage,
}: MessageProps) => {
  const isSenderMessage = currentUser?.id === messageData?.senderId;
  const messageImage = isSenderMessage ? currentUser?.image : receiver?.image;
  const imageOrFile = messageData?.image
    ?.split(".com/")
    .pop()
    ?.split(".")
    .pop();

  const isImage =
    imageOrFile === "jpg" || imageOrFile === "png" || imageOrFile === "jpeg";
  const isFile =
    imageOrFile === "pdf" || imageOrFile === "docx" || imageOrFile === "doc";

  return (
    <div className="flex flex-col justify-center">
      <div
        className={cn(
          "flex w-full items-center gap-2",
          isSenderMessage ? "flex-row-reverse" : "justify-start",
        )}
      >
        <Avatar>
          <AvatarImage
            src={messageImage || "/images/placeholder.png"}
            alt="avatar image"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "w-fit overflow-hidden rounded-xl bg-gray-100 p-2",
            isSenderMessage
              ? "bg-primary text-white"
              : "bg-gray-200 text-black",
          )}
        >
          <p className="break-words">{messageData?.body}</p>
          {messageData?.image && isImage && (
            <Dialog>
              <DialogTrigger asChild>
                <Image
                  src={messageData?.image || ""}
                  alt="message image"
                  height={100}
                  width={100}
                  priority
                  className="h-[150px] w-[150px] cursor-pointer rounded-md object-cover"
                />
              </DialogTrigger>
              <DialogHeader>
                <DialogTitle className="sr-only">message image</DialogTitle>
                <DialogDescription className="sr-only">
                  handle big image on click
                </DialogDescription>
              </DialogHeader>
              <DialogContent className="flex max-h-full max-w-full items-center justify-center">
                <Image
                  src={messageData?.image || ""}
                  alt="message image"
                  priority
                  width={1000}
                  height={1000}
                  className="h-auto w-auto rounded-md object-contain"
                />
              </DialogContent>
            </Dialog>
          )}

          {messageData?.image && isFile && (
            <div className="flex items-center justify-center">
              <Link href={messageData?.image} target="_blank">
                <FaFile size={40} />
              </Link>
              <span>Fișier atașat</span>
            </div>
          )}
        </div>
      </div>
      {isLastMessage && (
        <span
          className={cn(
            "p-1 text-xs text-gray-500",
            isSenderMessage ? "text-right" : "text-left",
          )}
        >
          Trimis acum {timeElapsedSince(messageData?.createdAt)}
        </span>
      )}
    </div>
  );
};

export default Message;
