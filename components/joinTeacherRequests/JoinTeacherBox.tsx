"use client";

import React, { useTransition } from "react";
import { Card } from "../ui/card";
import { BookOpenIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { JoinRequest } from "@prisma/client";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { declineRequest } from "@/actions/requests/declineRequest";

import useUserById from "@/hooks/users/useUserById";
import timeElapsedSince from "@/utils/timeElapseSince";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import { acceptRequest } from "@/actions/requests/acceptRequest";
import SendMessageBadge from "../common/SendMessageBadge";

interface JoinTeacherBoxProps {
  requestData: JoinRequest;
  mutateReqData: () => void;
  isTeacher: boolean;
}
const JoinTeacherBox = ({
  requestData,
  isTeacher,
  mutateReqData,
}: JoinTeacherBoxProps) => {
  const router = useRouter();
  const { data: studentData } = useUserById(requestData?.studentId);
  const { data: teacherData } = useUserById(requestData?.teacherId);
  const [isPending, startTransition] = useTransition();

  const rejectRequest = () => {
    startTransition(() => {
      declineRequest(requestData?.id).then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          mutateReqData();
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  const markRequestAccepted = () => {
    startTransition(() => {
      acceptRequest(requestData?.id).then((res) => {
        if (res.success) {
          toast.success(res.success);
          router.refresh();
          mutateReqData();
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  const sendMessageTo = isTeacher
    ? requestData?.studentId
    : requestData?.teacherId;

  const teacherControls = isTeacher ? (
    <div className="flex gap-2">
      <Button className="text-sm" onClick={markRequestAccepted}>
        Acceptă
      </Button>
      <Button variant="destructive" className="text-sm" onClick={rejectRequest}>
        Respinge
      </Button>
    </div>
  ) : null;

  const badgeFormat =
    requestData?.status === "PENDING"
      ? {
          name: "în așteptare",
          color: "bg-yellow-500",
        }
      : requestData?.status === "DECLINED"
        ? {
            name: "Refuzat",
            color: "bg-red-500",
          }
        : requestData?.status === "ACCEPTED"
          ? {
              name: "Acceptat",
              color: "bg-green-500",
            }
          : null;
  if (isPending) return <Loading />;

  return (
    <Card className="relative flex w-full flex-col gap-2 p-4">
      <BookOpenIcon className="h-6 w-6" />

      <h3 className="flex items-center overflow-hidden text-lg font-medium">
        <span className="flex-shrink-0 text-gray-600">Nume proiect: </span>
        <span className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
          {requestData?.projectName}
        </span>
      </h3>
      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className={`${badgeFormat?.color} px-2 py-1 text-xs`}
        >
          {badgeFormat?.name}
        </Badge>
        <span className="text-xs text-muted-foreground">
          Trimisă acum {timeElapsedSince(requestData?.createdAt)}
        </span>
      </div>
      <div className="text-sm text-muted-foreground">
        Student: {studentData?.name}
      </div>
      {!isTeacher && (
        <div className="text-sm text-muted-foreground">
          Cerere trimisă către: {teacherData?.name}
        </div>
      )}

      {teacherControls}
      <SendMessageBadge sendMessageTo={sendMessageTo} />
    </Card>
  );
};

export default JoinTeacherBox;
