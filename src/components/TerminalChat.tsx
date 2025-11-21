"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoreVertical, Loader2, Paperclip, ChevronDown, Lightbulb, Mic } from "lucide-react";
import { useChat } from "@/lib/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const TerminalChat = () => {
  const { messages, isTyping, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Top Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-xs font-bold">G</span>
          </div>
          <h1 className="text-xl font-semibold">Grok</h1>
          <Button
            onClick={clearChat}
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-gray-400 hover:text-white hover:bg-gray-800 text-sm"
          >
            New chat
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-800">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Area */}
      <div className="pt-20 pb-28 px-6 md:px-12 max-w-4xl mx-auto">
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6 py-8">
            {/* Empty State */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-32 space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50 animate-pulse" />
                  <div className="absolute inset-2 w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full animate-ping" />
                  <div className="absolute inset-4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full shadow-xl shadow-blue-600/50" />
                </div>
                <h2 className="text-2xl md:text-3xl font-medium text-gray-300">How can I help you?</h2>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "gap-4")}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                    <span className="text-xs font-bold">G</span>
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-2xl px-6 py-5 rounded-3xl shadow-xl border border-gray-800/50 backdrop-blur-sm",
                    msg.role === "assistant"
                      ? "bg-gray-900/50 rounded-tl-lg"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-lg ml-auto"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                  <span className="text-xs font-bold">G</span>
                </div>
                <div className="max-w-2xl px-6 py-5 bg-gray-900/50 rounded-3xl rounded-tl-lg border border-gray-800/50 backdrop-blur-sm flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                  <span className="text-gray-400">Grok is typing...</span>
                </div>
              </div>
            )}
          </div>
          <div ref={scrollRef} />
        </ScrollArea>
      </div>

      {/* Bottom Input Bar - Pixel-perfect screenshot match */}
      <div className="fixed bottom-6 left-6 right-6 md:bottom-8 md:left-12 md:right-12 z-40 max-w-4xl mx-auto">
        <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800/50 rounded-3xl p-3 md:p-4 shadow-2xl hover:shadow-xl transition-all">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Grok..."
              className="flex-1 min-h-[44px] max-h-24 resize-none bg-transparent border-0 outline-none text-white placeholder-gray-500 text-sm leading-relaxed p-3 -m-3 md:-m-4 rounded-3xl focus-visible:ring-0"
              rows={1}
            />
            <div className="flex items-center gap-1 h-10 flex-shrink-0">
              <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-9 px-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl gap-1">
                Grok
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl">
                <Lightbulb className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalChat;