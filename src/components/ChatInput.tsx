"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Paperclip, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
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
    <div className="relative p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end gap-3"
      >
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Thinking..." : "Type your message..."}
            disabled={disabled}
            className="pr-16 pl-4 py-3 border-none shadow-lg bg-gray-50 dark:bg-gray-800 rounded-full resize-none focus:ring-2 focus:ring-blue-500 transition-all"
            rows={1}
          />
          
          <div className="absolute right-2 bottom-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={disabled}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={disabled}
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="lg"
            className="h-12 w-12 rounded-full"
            disabled={disabled}
          >
            <Mic className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full shadow-lg"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatInput;