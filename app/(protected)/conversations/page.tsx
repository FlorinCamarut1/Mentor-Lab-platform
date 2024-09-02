"use client";
import { useCurrentUserData } from "@/hooks/users/useCurrentUserData";

import ConversationContainer from "@/components/conversations/ConversationContainer";
import MobileConversationContainer from "@/components/conversations/MobileConversationContainer";

import React from "react";

const ConversationsPage = () => {
  const { data: currentUserData } = useCurrentUserData();

  return (
    <>
      <MobileConversationContainer currentUser={currentUserData!} />

      <div className="hidden lg:block lg:h-[600px]">
        <ConversationContainer currentUser={currentUserData!} />
      </div>
    </>
  );
};

export default ConversationsPage;
