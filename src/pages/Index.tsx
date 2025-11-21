"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedBackground from "@/components/AnimatedBackground";
import ChatWindow from "@/components/ChatWindow";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "AI Chat - Powered by OpenRouter";
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-screen bg-gradient-to-b from-white/20 via-transparent to-white/20 dark:from-gray-900/20 via-transparent to-gray-900/20 backdrop-blur-3xl shadow-2xl flex flex-col"
        >
          {!isMobile ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-72 border-r border-gray-200/30 dark:border-gray-800/30 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-gray-900/95 via-gray-900/90 to-transparent backdrop-blur-sm"
            >
              <div className="p-6">
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    AI Assistant
                  </h2>
                  <div className="w-2 h-2 bg-green-400 rounded-full inline-block ml-2 animate-pulse" />
                </motion.div>
                
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Features
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <motion.li
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span>Chat with Grok 4.1 Fast</span>
                      </motion.li>
                      <motion.li
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span>Generate images with Gemini 2.5 Flash</span>
                      </motion.li>
                      <motion.li
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                        <span>Smooth, animated interface</span>
                      </motion.li>
                      <motion.li
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>Real-time responses</span>
                      </motion.li>
                    </ul>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      Try these prompts
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {[
                        "Explain quantum computing",
                        "generate an image of a futuristic city", 
                        "Write a poem about space",
                        "Help me debug this code"
                      ].map((prompt, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 1.0 + i * 0.1 }}
                          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all cursor-pointer"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                          <span className="text-xs">{prompt}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null}
          
          <ChatWindow />
        </motion.div>
      </div>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;