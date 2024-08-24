"use client";

import InvitationsContainer from "./InvitationsContainer";

interface InviteCodeBarProps {
  className?: string;
}
const InviteCodeBar = ({ className }: InviteCodeBarProps) => {
  return (
    <div
      className={`${className} mr-4 hidden h-fit w-[400px] rounded-sm border-[1px] border-gray-100 p-2 shadow-sm lg:flex lg:flex-col`}
    >
      <InvitationsContainer />
    </div>
  );
};

export default InviteCodeBar;
