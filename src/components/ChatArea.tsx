"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { Brain } from "lucide-react";

interface ChatAreaProps {
  messages: any[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
}

const ChatArea = ({ messages, isTyping, sendMessage }: ChatAreaProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="max-w-2xl mx-auto w-full px-4 py-8 space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20 space-y-4"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(59,130,246,0.4)",
                      "0 0 0 20px rgba(59,130,246,0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-48 h-48"
                >
                  <div className="w-48 h-48 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                    <Brain className="w-24 h-24 text-white/80" />
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <h2 className="text-2xl font-medium text-gray-400">How can I help you?</h2>
                </motion.div>
              </motion.div>
            ) : (
              messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isTyping={false}
                />
              ))
            )}
            {isTyping && (
              <MessageBubble
                message={{
                  id: "typing",
                  role: "assistant" as const,
                  content: "",
                  timestamp: new Date(),
                }}
                isTyping={true}
              />
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatArea;