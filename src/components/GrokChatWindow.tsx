"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Brain, RotateCcw, Paperclip, Smile, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/components/ui/cn";
import { useChat } from "@/lib/use-chat";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const GrokChatWindow = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;
    
    sendMessage(input.trim());
    setInput("");
    
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

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
    <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-black/50 via-transparent to-black/50">
      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Grok</h1>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <Brain className="h-3 w-3" />
                xAI's advanced AI
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={clearChat}
            className="text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>
      </div>

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
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse shadow-sm" />
                </motion.div>
                
                <div className="space-y-2">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-white"
                  >
                    How can I help you today?
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 max-w-md leading-relaxed"
                  >
                    Ask me anything, or request image generation with prompts like 
                    <span className="font-medium text-orange-400">"generate image of..."</span>
                  </p>
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
                      onClick={() => {
                        sendMessage(action.text);
                      }}
                      className="text-left p-3 bg-white/10 dark:bg-gray-800/20 rounded-lg border border-white/20 dark:border-gray-700/30 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{action.icon}</span>
                        <span className="text-sm text-gray-300 dark:text-gray-300">{action.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3"
                >
                  {message.role === "user" ? (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-8 h-8"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justifycenter">
                        <span className="text-white text-xs font-medium">
                          {message.content.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="w-8 h-8"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div
                    initial={{ x: message.role === "user" ? 20 : -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex-1 max-w-md"
                  >
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                        message.role === "user" 
                          ? "bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-600/20 text-white border border-orange-500/30"
                          : "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-gray-100 border border-gray-600/30"
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-xs text-gray-500 mt-1"
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            )}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 max-w-3xl"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-8 h-8"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justifycenter shadow-lg">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 rounded-2xl px-4 py-3 max-w-md"
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
      <div className="relative p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-4"
          >
            {/* Clear Button */}
            <Button
              variant="ghost"
              onClick={clearChat}
              className="h-10 w-10 rounded-full text-gray-400 hover:text-orange-400 hover:bg-orange-400/10 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            {/* Input Area */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustHeight();
                }}
                onKeyPress={handleKeyPress}
                placeholder={isTyping ? "Grok is thinking..." : "Message Grok..."}
                disabled={isTyping}
                className="w-full px-4 py-3 text-sm border-none bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all resize-none text-white placeholder-gray-400"
                rows={1}
                style={{
                  minHeight: '40px',
                  maxHeight: '120px',
                  lineHeight: '1.5'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="h-10 w-10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                disabled={isTyping}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                className="h-10 w-10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                disabled={isTyping}
              >
                <Smile className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                className="h-10 w-10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                disabled={isTyping}
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="h-10 w-10 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GrokChatWindow;