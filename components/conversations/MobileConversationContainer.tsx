"use client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import useConversationStore from "@/store/conversationStore";
import ConversationContainer from "./ConversationContainer";

const MobileConversationContainer = ({
  currentUser,
}: {
  currentUser: Session["user"];
}) => {
  const conversationStore = useConversationStore();
  const router = useRouter();

  if (!conversationStore.mobileConversationBoxOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 flex flex-col overflow-hidden bg-white">
        <div
          className="flex w-full cursor-pointer items-center gap-2 p-2"
          onClick={() => {
            conversationStore.setMobileConversationBoxOpen(false);
            router.push("/conversations");
          }}
        >
          <IoMdArrowRoundBack size={30} />
          <p className="font-semibold text-gray-500">Înapoi la conversații</p>
        </div>
        <ConversationContainer currentUser={currentUser} />
      </div>
    </div>
  );
};

export default MobileConversationContainer;
