"use client";

import { Button } from "@/components/ui/button";
import { Settings, Plus, History, Google } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  clearChat: () => void;
}

const Sidebar = ({ clearChat }: SidebarProps) => {
  const isMobile = useIsMobile();

  const dummyChats = [
    { id: 1, title: "Explain quantum physics", timestamp: "Today" },
    { id: 2, title: "Write a React hook", timestamp: "Yesterday" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isMobile ? 0 : 260 }}
      className="bg-[#202123] border-r border-[#343541] flex flex-col h-screen overflow-hidden relative"
      style={{ width: isMobile ? 0 : 260 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-[#343541] flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start h-9 px-2 text-white hover:bg-[#343541] w-full"
          onClick={clearChat}
        >
          <Plus className="mr-2 h-4 w-4 shrink-0" />
          New chat
        </Button>
      </div>

      {/* History */}
      <div className="flex-1 overflow-auto py-2">
        <div className="px-3 mb-1 flex items-center">
          <History className="mr-2 h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Recent</span>
        </div>
        {dummyChats.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No recent chats
          </div>
        ) : (
          dummyChats.map((chat) => (
            <Button
              key={chat.id}
              variant="ghost"
              className="justify-start h-10 px-3 w-full hover:bg-[#343541] text-left text-sm truncate"
            >
              {chat.title}
              <div className="ml-auto text-xs text-gray-500">{chat.timestamp}</div>
            </Button>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-[#343541] space-y-1">
        <Button variant="ghost" className="justify-start h-8 px-3 w-full hover:bg-[#343541]">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="justify-start h-9 px-3 w-full hover:bg-[#343541]">
          <Google className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;