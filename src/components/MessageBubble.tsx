"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Code } from "lucide-react";

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 px-4 py-2 max-w-3xl",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "rounded-2xl px-4 py-3 max-w-md",
          isUser 
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 dark:from-gray-800 dark:to-gray-700 dark:text-gray-100"
        )}
      >
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        
        {isTyping && (
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [-4, 0, -4] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
            ))}
          </div>
        )}
        
        <div className="text-xs opacity-70 mt-2 text-right">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </motion.div>
      
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/api/placeholder/32/32" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
};

export default MessageBubble;