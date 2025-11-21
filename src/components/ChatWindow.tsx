"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessagesSquare, Trash2, Sparkles, Brain, RefreshCw } from "lucide-react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useChat } from "@/lib/use-chat";

const ChatWindow = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-white/80 via-white/90 to-transparent dark:from-gray-900/80 via-gray-900/90 to-transparent">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-gray-200/60 dark:border-gray-800/60 bg-gradient-to-r from-white/90 via-white/95 to-transparent dark:from-gray-900/90 via-gray-900/95 to-transparent backdrop-blur-sm"
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-sm" />
            </motion.div>
            
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white to-gray-300 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Brain className="h-3 w-3" />
                Powered by Grok 4.1 Fast
              </p>
            </div>
          </div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              onClick={clearChat}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-16 text-center gap-6"
              >
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative"
                >
                  <MessagesSquare className="h-20 w-20 text-gray-300 dark:text-gray-600 mb-4" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
                
                <div className="space-y-2">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-gray-700 dark:text-gray-200"
                  >
                    How can I help you today?
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 dark:text-gray-400 max-w-md leading-relaxed"
                  >
                    Ask me anything, or request image generation with prompts like 
                    <span className="font-medium text-blue-600">"generate an image of..."</span>
                  </motion.p>
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md w-full"
                >
                  {[
                    { text: "Explain quantum computing", icon: "🔬" },
                    { text: "generate an image of a futuristic city", icon: "🌆" },
                    { text: "Write a poem about space", icon: "⭐" },
                    { text: "Help me debug this code", icon: "💻" }
                  ].map((action, i) => (
                    <motion.button
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        x: 5,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(action.text)}
                      className="text-left p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{action.icon}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{action.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 max-w-3xl justify-start"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-10 h-10"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800/50 via-gray-700/50 to-gray-600/50 rounded-full flex items-center justify-center shadow-lg shadow-gray-500/10">
                    <Sparkles className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800/50 via-gray-700/50 to-gray-600/50 rounded-2xl px-5 py-3 max-w-md"
                >
                  <div className="flex gap-2">
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
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={isTyping} 
        onClearChat={clearChat}
      />
    </div>
  );
};

export default ChatWindow;