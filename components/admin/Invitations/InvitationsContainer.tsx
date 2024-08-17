"use client";
import { Button } from "@/components/ui/button";
import { generateInviteToken } from "@/actions/inviteToken/generateInviteToken";
import React, { useTransition } from "react";

import useAllInvitations from "@/hooks/registerTeacherInvitation/useAllInvitations";
import InviteCodeBox from "./InviteCodeBox";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import CustomScrollbarWrapper from "@/components/common/CustomScrollbarWrapper";

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

  const hideScrollbarWhenEmpty =
    invitationsData?.length <= 8 ? "no-scrollbar" : "";

  return (
    <>
      <Button onClick={generateInviteCode} className="m-2 hidden lg:block">
        Generează o invitație
      </Button>

      <CustomScrollbarWrapper
        isLoading={isPending}
        className="flex max-h-[400px] flex-col gap-2"
      >
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
      </CustomScrollbarWrapper>
    </>
  );
};

export default InvitationsContainer;
