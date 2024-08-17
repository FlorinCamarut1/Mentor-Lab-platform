import toast from "react-hot-toast";
import AlertDeleteDialog from "@/components/common/AlertDeleteDialog";
import useAllInvitations from "@/hooks/registerTeacherInvitation/useAllInvitations";

import { useRef, useState, useTransition } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteInviteToken } from "@/actions/inviteToken/deleteInviteToken";
import { calculateRemainingTimeInMinutes } from "@/lib/utils";
interface InviteCodeBoxProps {
  inviteToken: string;
  invitationNumber: number;
  inviteId: string;
  expires: string;
}
const InviteCodeBox = ({
  inviteToken,
  invitationNumber,
  inviteId,
  expires,
}: InviteCodeBoxProps) => {
  const { mutate: mutateInvitations } = useAllInvitations();
  const [isPending, startTransition] = useTransition();
  const linkRef = useRef<HTMLParagraphElement>(null);
  const [showAlert, setShowAlert] = useState(false);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(linkRef.current?.textContent ?? "");
    toast.success("Link copiat în clipboard");
  };

  const deleteInviteLink = () => {
    startTransition(() => {
      deleteInviteToken(inviteId).then((res) => {
        if (res.success) {
          toast.success(res.success as string);
          mutateInvitations();
        } else {
          toast.error(res.error as string);
        }
      });
    });
  };

  const tokenExpireIn =
    calculateRemainingTimeInMinutes(expires) > 0
      ? `Expiră în ${calculateRemainingTimeInMinutes(expires)} minute`
      : "Token expirat";

  return (
    <>
      <AlertDeleteDialog
        dialogOpen={showAlert}
        onDialogOpen={setShowAlert}
        deleteFn={deleteInviteLink}
      />

      <div className="flex w-full items-center justify-evenly gap-2 rounded-sm border-[1px] border-gray-200 p-2 shadow-md">
        <p className="font-semibold text-primary">Link: {invitationNumber}</p>
        <p className="font-semibold text-gray-400">{tokenExpireIn}</p>
        <div className="flex gap-4">
          <FaRegTrashCan
            color="red"
            onClick={() => setShowAlert((prev) => !prev)}
            className="cursor-pointer"
          />
          <FaRegCopy onClick={copyLinkToClipboard} className="cursor-pointer" />
        </div>
      </div>
      <p className="sr-only" ref={linkRef}>
        {`${process.env.NEXT_PUBLIC_CLIENT}/auth/register?inviteToken=${inviteToken}`}
      </p>
    </>
  );
};

export default InviteCodeBox;
