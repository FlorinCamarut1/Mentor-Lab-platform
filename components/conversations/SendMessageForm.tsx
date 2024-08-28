"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaImage } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState, useTransition } from "react";
import { sendMessage } from "@/actions/conversation/sendMessage";
import { useConversationById } from "@/hooks/conversation/useConversationById";
import { PiNumberOneLight } from "react-icons/pi";
import { IoCloseCircleSharp } from "react-icons/io5";

import toast from "react-hot-toast";
import axios from "axios";
import useConversationStore from "@/store/conversationStore";

interface SendMessageFormProps {
  conversationId: string;
  scrollToBottom: () => void;
}

const SendMessageForm = ({
  conversationId,
  scrollToBottom,
}: SendMessageFormProps) => {
  const conversationStore = useConversationStore();

  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: mutateCurrentConversation } =
    useConversationById(conversationId);

  const SendMessageSchema = z.object({
    message: z.string().optional(),
  });

  const form = useForm<z.infer<typeof SendMessageSchema>>({
    resolver: zodResolver(SendMessageSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SendMessageSchema>) => {
    if (conversationStore.image) {
      const formData = new FormData();
      formData.append("file", conversationStore.image);
      await axios
        .post("/api/conversations/uploadMessageImage", formData)
        .then((res) => {
          if (res) {
            startTransition(() => {
              sendMessage(
                conversationId,
                values?.message as string,
                res.data.fileUrl,
              ).then((res) => {
                if (res?.success) {
                  toast.success(res.success);
                  form.reset();
                  conversationStore.setImage(null);

                  mutateCurrentConversation();
                } else {
                  toast.error(res?.error as string);
                }
              });
            });
          }
        })
        .catch((error) => {
          toast.error("Ceva nu a mers bine");
        });
    } else if (!conversationStore.image) {
      startTransition(() => {
        sendMessage(conversationId, values?.message as string).then((res) => {
          if (res?.success) {
            toast.success(res.success);
            form.reset();
            conversationStore.setImage(null);

            mutateCurrentConversation();
          } else {
            toast.error(res?.error as string);
          }
        });
      });
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    scrollToBottom();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center gap-2 border-t p-2 shadow-sm"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Trimite un mesaj..."
                  {...field}
                  ref={inputRef}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <label htmlFor="loadImage">
            {conversationStore.image ? (
              <div className="flex items-center gap-1">
                <PiNumberOneLight
                  size={30}
                  className="rounded-md bg-gray-100"
                />
                <IoCloseCircleSharp
                  className="cursor-pointer"
                  size={30}
                  onClick={(e) => {
                    e.preventDefault();
                    conversationStore.setImage(null);
                  }}
                />
              </div>
            ) : (
              <FaImage size={30} className="cursor-pointer" />
            )}
          </label>
          <Input
            type="file"
            id="loadImage"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                conversationStore.setImage(e.target.files[0]);
                e.target.value = "";
              }
            }}
          />
        </div>
        <Button disabled={isPending} type="submit">
          Trimite
        </Button>
      </form>
    </Form>
  );
};

export default SendMessageForm;
