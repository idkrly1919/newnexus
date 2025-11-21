"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Paperclip, Smile, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  onClearChat?: () => void;
}

const ChatInput = ({ onSendMessage, disabled = false, onClearChat }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const message = input.trim();
    if (message && !disabled) {
      onSendMessage(message);
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  }, [input, onSendMessage, disabled]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, []);

  return (
    <div className="relative p-6 bg-gradient-to-t from-gray-50/80 via-gray-100/60 to-transparent dark:from-gray-900/80 via-gray-800/60 to-transparent backdrop-blur-sm border-t border-gray-200 dark:border-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end gap-4 max-w-4xl mx-auto"
      >
        {/* Clear Chat Button */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={onClearChat}
            className="h-12 w-12 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Input Area */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                adjustHeight();
              }}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? "AI is thinking..." : "Type your message..."}
              disabled={disabled}
              className="w-full px-5 py-3 text-sm border-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all resize-none"
              rows={1}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
                lineHeight: '1.5'
              }}
            />
            
            <div className="absolute right-2 bottom-2 flex gap-1">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                  disabled={disabled}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                  disabled={disabled}
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-12 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
              disabled={disabled}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleSend}
              disabled={!input.trim() || disabled}
              className="h-12 w-12 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInput;