import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useAllInvitations = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/invitations`,
    fetcher,
  );

  return { data, error, isLoading, mutate };
};
export default useAllInvitations;
