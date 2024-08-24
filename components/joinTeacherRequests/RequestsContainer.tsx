"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { JoinRequest, User } from "@prisma/client";

import React from "react";
import JoinTeacherBox from "./JoinTeacherBox";
import TeacherDisponibility from "./TeacherDisponibility";
import useReqByUserId from "@/hooks/joinTeacherRequest/useReqByUserId";

interface RequestsContainerProps {
  currentUserData: User | null;
}

const RequestsContainer = ({ currentUserData }: RequestsContainerProps) => {
  const { data: requestsData, mutate: mutateRequests } = useReqByUserId(
    currentUserData?.id as string,
  );

  const isTeacher = currentUserData?.role === "TEACHER";

  if (requestsData?.length === 0)
    return <h2 className="text-center text-gray-500">Nu există cereri.</h2>;

  return (
    <ScrollArea className="space-y-4">
      <div className="flex flex-col items-center justify-between lg:flex-row">
        {currentUserData?.role === "TEACHER" && (
          <TeacherDisponibility teacherId={currentUserData?.id} />
        )}
        <h3 className="text-md font-semibold text-gray-500">
          Număr cereri:
          <span className="ml-2 font-bold text-black">
            {requestsData?.length}
          </span>{" "}
        </h3>
      </div>
      <div className="grid max-h-[800px] w-full grid-cols-1 gap-2 lg:grid-cols-3">
        {requestsData?.map((request: JoinRequest) => (
          <JoinTeacherBox
            mutateReqData={mutateRequests}
            key={request.id}
            requestData={request}
            isTeacher={isTeacher}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default RequestsContainer;
