import { getCurrentUser } from "@/actions/getCurrentUser";

import ConversationContainer from "@/components/conversations/ConversationContainer";
import MobileConversationContainer from "@/components/conversations/MobileConversationContainer";

import React from "react";

const ConversationsPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <MobileConversationContainer currentUser={currentUser!} />

      <div className="hidden lg:block lg:h-[600px]">
        <ConversationContainer currentUser={currentUser!} />
      </div>
    </>
  );
};

export default ConversationsPage;
