import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export const useMyMentorData = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/teacher/getMyMentorData",
    fetcher,
  );

  return { data, error, isLoading, mutate };
};
