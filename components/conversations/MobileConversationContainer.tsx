"use client";
import useConversationStore from "@/store/conversationStore";
import ConversationContainer from "./ConversationContainer";
import { User } from "@prisma/client";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const MobileConversationContainer = ({
  currentUser,
}: {
  currentUser: User;
}) => {
  const conversationStore = useConversationStore();
  const router = useRouter();

  if (!conversationStore.mobileConversationBoxOpen) return null;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-white lg:hidden">
      <div
        className="flex w-full cursor-pointer items-center gap-2 p-2 lg:hidden"
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
  );
};

export default MobileConversationContainer;
