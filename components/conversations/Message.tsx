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

interface MessageProps {
  messageData: MessageType;
  currentUser: User;
  receiver: User;
}

const Message = ({ messageData, currentUser, receiver }: MessageProps) => {
  const isSenderMessage = currentUser?.id === messageData?.senderId;
  const messageImage = isSenderMessage ? currentUser?.image : receiver?.image;
  return (
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
          "w-fit overflow-hidden rounded-sm bg-gray-100 p-2",
          isSenderMessage ? "bg-primary text-white" : "bg-gray-200 text-black",
        )}
      >
        <p className="break-words">{messageData?.body}</p>
        {messageData?.image && (
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
                className="max-h-full max-w-full rounded-md object-contain"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Message;
