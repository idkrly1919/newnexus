"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useChat } from "@/lib/use-chat";
import { Terminal, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const TerminalChat = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTypingEffect, setIsTypingEffect] = useState(false);

  // Typewriter effect for assistant messages
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1]?.role === "assistant") {
      const lastMsg = messages[messages.length - 1];
      setDisplayedContent("");
      setIsTypingEffect(true);
      
      let i = 0;
      const timer = setInterval(() => {
        if (i < lastMsg.content.length) {
          setDisplayedContent(lastMsg.content.slice(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          setIsTypingEffect(false);
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      sendMessage(input.trim());
      setInput("");
    }
  }, [input, isTyping, sendMessage]);

  const handleClear = () => {
    clearChat();
    setDisplayedContent("");
  };

  return (
    <div className="h-screen flex flex-col font-mono text-green-400 bg-black">
      {/* Header */}
      <div className="bg-black/80 border-b border-green-900/50 px-6 py-4 flex items-center gap-4">
        <Terminal className="w-6 h-6 text-green-400" />
        <div className="text-lg font-bold">Grok Terminal</div>
        <button
          onClick={handleClear}
          className="ml-auto text-green-400 hover:text-green-300 px-3 py-1 border border-green-600 rounded text-xs"
        >
          Clear
        </button>
      </div>

      {/* Terminal Output */}
      <ScrollArea className="flex-1 p-6 overflow-auto bg-black">
        <div className="space-y-4">
          {/* Empty state */}
          {messages.length === 0 && (
            <div className="text-center py-20 text-green-500/70">
              <div className="text-2xl mb-4 animate-pulse">┌─────────────────────────────────────┐</div>
              <div>│        Welcome to Grok Terminal    │</div>
              <div>│                                   │</div>
              <div>│ Type your message and press Enter │</div>
              <div>└─────────────────────────────────────┘</div>
              <div className="mt-8 text-sm">Try: "Explain quantum computing"</div>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, idx) => (
            <div key={msg.id} className="flex">
              <span className={cn(
                "flex-shrink-0 w-16 text-right pr-4 text-green-500/70",
                msg.role === "user" ? "text-cyan-400" : "text-green-500"
              )}>
                {msg.role === "user" ? "user" : "grok"}&gt;
              </span>
              <pre className="flex-1 bg-black/50 p-3 rounded border-l-4 border-green-600/50 whitespace-pre-wrap text-green-400">
                {msg.role === "assistant" && idx === messages.length - 1 && isTypingEffect
                  ? displayedContent + (isTyping ? "|" : "")
                  : msg.content}
              </pre>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex">
              <span className="flex-shrink-0 w-16 text-right pr-4 text-green-500/70">grok&gt;</span>
              <pre className="flex-1 bg-black/50 p-3 rounded border-l-4 border-green-600/50 flex space-x-1">
                <span className="animate-pulse">█</span>
                <span className="animate-pulse delay-150">█</span>
                <span className="animate-pulse delay-300">█</span>
              </pre>
            </div>
          )}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-green-900/30 bg-black/80">
        <div className="flex items-center gap-4">
          <span className="text-green-500 flex-shrink-0">&gt;</span>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your command..."
            className="flex-1 bg-black/50 border-green-600/50 text-green-400 placeholder-green-500 focus:border-green-400 font-mono"
            autoFocus
          />
          <Send className="w-5 h-5 text-green-400 cursor-pointer hover:text-green-300" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default TerminalChat;