"use client";
import { Button } from "@/components/ui/button";
import { generateInviteToken } from "@/actions/inviteToken/generateInviteToken";
import React, { useTransition } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import useAllInvitations from "@/hooks/registerTeacherInvitation/useAllInvitations";
import InviteCodeBox from "./InviteCodeBox";
import toast from "react-hot-toast";

const InvitationsContainer = () => {
  const { data: invitationsData, mutate: mutateInvitations } =
    useAllInvitations();

  setTimeout(
    () => {
      mutateInvitations();
    },
    15 * 60 * 1000,
    // 15 minutes
  );

  const [isPending, startTransition] = useTransition();

  const generateInviteCode = () => {
    startTransition(() => {
      generateInviteToken().then((res) => {
        if (res.success) {
          toast.success(res.success as string);
          mutateInvitations();
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  return (
    <>
      <Button onClick={generateInviteCode} className="m-2 hidden lg:block">
        Generează o invitație
      </Button>
      <ScrollArea className="h-full w-full">
        <div className="flex max-h-[400px] flex-col gap-2">
          {invitationsData?.map(
            (
              invitation: { id: string; token: string; expires: string },
              index: number,
            ) => (
              <InviteCodeBox
                key={invitation.id}
                inviteId={invitation.id}
                inviteToken={invitation.token}
                invitationNumber={index + 1}
                expires={invitation.expires}
              />
            ),
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default InvitationsContainer;
