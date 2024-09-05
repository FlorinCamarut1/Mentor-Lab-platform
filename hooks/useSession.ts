import { User } from "@prisma/client";

import fetcher from "@/lib/fetcher";

import useSWR from "swr";
import { Session } from "next-auth";

export const useSession = () => {
  const { data, mutate, error, isLoading } = useSWR<Session>(
    "/api/session",
    fetcher,
  );
  return { data, error, isLoading, mutate };
};
