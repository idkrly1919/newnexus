"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Code, Image as ImageIcon, Sparkles } from "lucide-react";

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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex gap-3 px-4 py-2 max-w-3xl",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-10 h-10"
        >
          <Avatar className="w-10 h-10 ring-2 ring-blue-200 dark:ring-blue-800">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback>
              <Sparkles className="h-5 w-5 text-blue-600" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
      )}
      
      <motion.div
        initial={{ x: isUser ? 20 : -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "relative max-w-md",
          isUser ? "order-2" : "order-1"
        )}
      >
        <div
          className={cn(
            "px-5 py-3 rounded-2xl text-sm leading-relaxed",
            isUser 
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20"
              : "bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 text-gray-800 dark:from-gray-800/50 via-gray-700/50 to-gray-600/50 dark:text-gray-100 shadow-lg shadow-gray-500/10"
          )}
        >
          <div className="whitespace-pre-wrap">
            {message.content}
          </div>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2 mt-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [-4, 0, -4],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-white/80 rounded-full"
                />
              ))}
            </motion.div>
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right px-3"
        >
          {message.timestamp.toLocaleTimeString()}
        </motion.div>
      </motion.div>
      
      {isUser && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-10 h-10"
        >
          <Avatar className="w-10 h-10 ring-2 ring-blue-200 dark:ring-blue-800">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-blue-500 text-white">
              {message.content.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MessageBubble;