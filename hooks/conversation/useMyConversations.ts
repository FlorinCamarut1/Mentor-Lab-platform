import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export const useMyConversations = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/conversations/getMyConversations`,
    fetcher,
  );
  return { data, error, isLoading, mutate };
};
