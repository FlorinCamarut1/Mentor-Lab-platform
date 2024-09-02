"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { JoinRequest } from "@prisma/client";
import { useCurrentUserData } from "@/hooks/users/useCurrentUserData";
import React, { Suspense } from "react";

import JoinTeacherBox from "./JoinTeacherBox";
import TeacherDisponibility from "./TeacherDisponibility";
import useReqByUserId from "@/hooks/joinTeacherRequest/useReqByUserId";
import Loading from "@/app/loading";

const RequestsContainer = () => {
  const { data: currentUserData } = useCurrentUserData();
  const { data: requestsData, mutate: mutateRequests } = useReqByUserId(
    currentUserData?.id as string,
  );

  const isTeacher = currentUserData?.role === "TEACHER";

  return (
    <Suspense fallback={<Loading />}>
      <ScrollArea className="space-y-4">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          {isTeacher && (
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
    </Suspense>
  );
};

export default RequestsContainer;
