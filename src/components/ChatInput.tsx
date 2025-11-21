"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const message = input.trim();
    if (message && !disabled) {
      onSendMessage(message);
      setInput("");
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

  useEffect(adjustHeight, [adjustHeight]);

  return (
    <div className="px-8 py-6 bg-[#343541] border-t border-[#40414f]">
      <div className="max-w-2xl mx-auto relative group">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyPress}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Send a message"
          disabled={disabled}
          className="w-full min-h-[40px] max-h-[200px] resize-none bg-[#40414f] border-0 text-white placeholder-gray-500 rounded-2xl px-5 py-4 text-base leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: focused || input ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="sm"
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg pointer-events-auto"
          >
            <Send className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatInput;