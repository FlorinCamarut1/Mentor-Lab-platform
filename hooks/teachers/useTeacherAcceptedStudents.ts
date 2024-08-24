import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export const useTeacherAcceptedStudents = (teacherId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/teacher/getTeacherAcceptedStudents/${teacherId}`,
    fetcher,
  );

  return { data, error, isLoading, mutate };
};
