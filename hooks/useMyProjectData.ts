import fetcher from "@/lib/fetcher";
import { AcceptedStudent } from "@prisma/client";
import useSWR from "swr";

export const useMyProjectData = () => {
  const { data, error, isLoading, mutate } = useSWR<AcceptedStudent>(
    "/api/getMyProjectData",
    fetcher,
  );
  return { data, error, isLoading, mutate };
};
