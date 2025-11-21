"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface MessageBubbleProps {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  };
  isTyping?: boolean;
}

const MessageBubble = ({ message, isTyping = false }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-4 max-w-[70%] mx-auto",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 flex-shrink-0">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#343541] text-gray-400">
              <Sparkles className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "px-6 py-5 rounded-2xl text-sm max-w-full leading-relaxed shadow",
            isUser
              ? "bg-[#343541] text-white"
              : "bg-[#2a2a2a] text-gray-100"
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
          {isTyping && (
            <div className="flex gap-1 mt-3">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                />
              ))}
            </div>
          )}
        </div>
        <div className={cn("text-xs text-gray-500 mt-1", isUser ? "text-right" : "text-left")}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 flex-shrink-0">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#343541] text-gray-400">
              {message.content.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;