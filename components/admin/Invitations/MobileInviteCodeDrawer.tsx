"use client";

import { useState, useTransition } from "react";
import { generateInviteToken } from "@/actions/inviteToken/generateInviteToken";

import InvitationsContainer from "./InvitationsContainer";
import useAllInvitations from "@/hooks/registerTeacherInvitation/useAllInvitations";
import toast from "react-hot-toast";
import MultiPurposeDrawer from "@/components/common/MultiPurposeDrawer";

const MobileInviteCodeDrawer = () => {
  const { mutate: mutateInvitations } = useAllInvitations();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <MultiPurposeDrawer
      isPending={isPending}
      triggerName="Generează o invitație"
      onDrawerOpen={setIsDrawerOpen}
      open={isDrawerOpen}
      submitFn={generateInviteCode}
      drawerTitle="Invitații active"
      submitBtnName="Generează o invitație"
      cancelBtnName="Anulează"
    >
      <InvitationsContainer />
    </MultiPurposeDrawer>
  );
};

export default MobileInviteCodeDrawer;
