import fetcher from "@/lib/fetcher";
import { Conversation, Message, User } from "@prisma/client";
import useSWR from "swr";

export const useConversationById = (conversationId: string) => {
  const { data, error, isLoading, mutate } = useSWR<
    Conversation & { messages: Message[]; users: User[] }
  >(
    `/api/conversations/getConversationById/${conversationId}`,
    !conversationId ? null : fetcher,
  );
  return { data, error, isLoading, mutate };
};
