"use client";
import React, { useState } from "react";
import AiChatBox from "./AiChatBox";
import { Button } from "../ui/button";
import { SiProbot } from "react-icons/si";

const AiChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4">
      {chatBoxOpen ? null : (
        <Button
          onClick={() => setChatBoxOpen((prev) => !prev)}
          className="rounded-full px-4 py-6"
        >
          <SiProbot size={20} />
        </Button>
      )}
      <AiChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </div>
  );
};

export default AiChatButton;
