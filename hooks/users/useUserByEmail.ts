import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useUserByEmail = (email: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/users/getUserByEmail/${email}`,
    !email ? null : fetcher,
  );

  return { data, error, isLoading, mutate };
};
export default useUserByEmail;
