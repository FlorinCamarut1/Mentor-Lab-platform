"use client";

import { useSession } from "@/hooks/useSession";

import ConversationContainer from "@/components/conversations/ConversationContainer";
import MobileConversationContainer from "@/components/conversations/MobileConversationContainer";

import React from "react";

const ConversationsPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <MobileConversationContainer currentUser={sessionData?.user!} />

      <div className="hidden lg:block lg:h-[600px]">
        <ConversationContainer currentUser={sessionData?.user!} />
      </div>
    </>
  );
};

export default ConversationsPage;
