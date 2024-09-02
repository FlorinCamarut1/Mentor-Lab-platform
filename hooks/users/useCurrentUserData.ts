import fetcher from "@/lib/fetcher";
import { CV, User } from "@prisma/client";
import useSWR from "swr";

export const useCurrentUserData = () => {
  const { data, mutate, error, isLoading } = useSWR<User & { CV: CV }>(
    "/api/users/getCurrentUserData",
    fetcher,
  );
  return { data, error, isLoading, mutate };
};
