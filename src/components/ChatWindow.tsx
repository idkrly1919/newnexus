"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessagesSquare, Trash2, Sparkles } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useChat } from "@/lib/use-chat";

const ChatWindow = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Assistant
            </h1>
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <MessagesSquare className="h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-600 mb-2">
                  Start a conversation
                </h2>
                <p className="text-gray-500 max-w-md">
                  Ask me anything, or request image generation with prompts like 
                  "generate an image of..." and I'll create stunning visuals for you.
                </p>
              </motion.div>
            ) : (
              messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isTyping={isTyping && message.id === messages[messages.length - 1].id}
                />
              ))
            )}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 px-4 py-2 max-w-3xl"
              >
                <div className="w-8 h-8">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
                  </div>
                </div>
                
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-4 py-3 max-w-md"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [-4, 0, -4] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatWindow;