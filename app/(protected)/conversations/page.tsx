import { getCurrentUser } from "@/actions/getCurrentUser";
import ConversationContainer from "@/components/conversations/ConversationContainer";
import MobileConversationContainer from "@/components/conversations/MobileConversationContainer";

import React from "react";

const ConversationsPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <div>
        <MobileConversationContainer currentUser={currentUser!} />

        <div className="hidden lg:flex">
          <ConversationContainer currentUser={currentUser!} />
        </div>
      </div>
    </>
  );
};

export default ConversationsPage;
