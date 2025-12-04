"use client";

import { useState } from "react";
import ChatList from "@/components/chat/ChatList";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className="flex h-[85vh] border rounded-xl">
      <ChatList onSelect={setActiveChat} />
      <ChatWindow chatId={activeChat} />
    </div>
  );
}
