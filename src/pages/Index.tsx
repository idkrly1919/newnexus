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
          className="w-full h-screen bg-white/10 dark:bg-black/10 backdrop-blur-3xl shadow-2xl flex flex-col"
        >
          {!isMobile ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white/20 dark:bg-black/20 backdrop-blur-md"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Assistant
                </h2>
                
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <h3 className="font-medium mb-2">Features:</h3>
                    <ul className="space-y-1 text-xs">
                      <li>• Chat with Grok 4.1 Fast</li>
                      <li>• Generate images with Gemini 2.5 Flash</li>
                      <li>• Smooth, animated interface</li>
                      <li>• Real-time responses</li>
                    </ul>
                  </div>
                  
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <h3 className="font-medium mb-2">Try these prompts:</h3>
                    <ul className="space-y-1 text-xs">
                      <li>• "Explain quantum computing"</li>
                      <li>• "generate an image of a futuristic city"</li>
                      <li>• "Write a poem about space"</li>
                      <li>• "Help me debug this code"</li>
                    </ul>
                  </div>
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