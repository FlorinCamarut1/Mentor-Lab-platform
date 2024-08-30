import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCvByTeacherId = (teacherId: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/getCVByTeacherId/${teacherId}`,
    !teacherId ? null : fetcher,
  );

  return { data, error, isLoading, mutate };
};
export default useCvByTeacherId;
