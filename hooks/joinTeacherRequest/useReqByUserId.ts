import useSWR from "swr";
import fetcher from "@/lib/fetcher";
const useReqByUserId = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/teacher/getRequestsByUserId/${userId}`,
    !userId ? null : fetcher,
  );
  return { data, error, isLoading, mutate };
};
export default useReqByUserId;
