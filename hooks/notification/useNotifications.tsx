import fetcher from "@/lib/fetcher";
import useSWR from "swr";

export const useNotifications = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/notifications",
    fetcher,
  );
  return { data, error, isLoading, mutate };
};
