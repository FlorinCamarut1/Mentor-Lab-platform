import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useUserById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users/getUserById/${id}`,
    !id ? null : fetcher,
  );

  return { data, error, isLoading, mutate };
};
export default useUserById;
