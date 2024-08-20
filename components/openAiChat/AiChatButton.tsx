"use client";
import React, { useState } from "react";
import AiChatBox from "./AiChatBox";
import { Button } from "../ui/button";
import { SiProbot } from "react-icons/si";

const AiChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  return (
    <div>
      {chatBoxOpen ? null : (
        <Button
          variant="outline"
          onClick={() => setChatBoxOpen((prev) => !prev)}
          className="bg-gray-300"
        >
          <SiProbot size={20} />
        </Button>
      )}
      <AiChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </div>
  );
};

export default AiChatButton;
