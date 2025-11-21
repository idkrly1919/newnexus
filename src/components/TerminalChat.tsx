"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MoreVertical, Loader2, Paperclip, ChevronDown, Lightbulb, Mic, Square, Send } from "lucide-react";
import { useChat } from "@/lib/use-chat";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const TerminalChat = () => {
  const { messages, isTyping, isGeneratingImage, sendMessage, clearChat, stopGeneration } = useChat();
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isGeneratingImage]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping && !isGeneratingImage) {
      sendMessage(input.trim());
      setInput("");
    }
  }, [input, isTyping, isGeneratingImage, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 animate-pulse" />
      
      {/* Top Header */}
      <div className="flex-shrink-0 bg-black/30 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 animate-bounce">
              <span className="text-xs sm:text-sm font-bold text-white">G</span>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-ping opacity-20" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Grok</h1>
            <p className="text-xs text-gray-400 hidden sm:block">Powered by OpenRouter</p>
          </div>
          <Button
            onClick={clearChat}
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-gray-300 hover:text-white hover:bg-white/10 text-sm transition-all duration-300"
          >
            New chat
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0 relative">
          <ScrollArea className="flex-1">
            <div className="space-y-6 py-6 sm:py-8 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full">
              {/* Empty State */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-16 sm:py-32 space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full shadow-2xl shadow-blue-500/50 animate-pulse" />
                  <div className="absolute inset-2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full animate-ping" />
                  <div className="absolute inset-4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full shadow-xl shadow-blue-600/50" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-200">How can I help you today?</h2>
                  <p className="text-sm sm:text-base text-gray-400 max-w-md mx-auto">
                    Ask me anything, request images, or explore ideas together.
                  </p>
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, index) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex transition-all duration-500 ease-out",
                  msg.role === "user" ? "justify-end" : "gap-3 sm:gap-4",
                  index === messages.length - 1 && "animate-in fade-in-0"
                )}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-white">G</span>
                </div>
                )}
                <div
                  className={cn(
                    "max-w-[85%] sm:max-w-2xl px-4 sm:px-6 py-3 sm:py-5 rounded-2xl sm:rounded-3xl shadow-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-2xl",
                    msg.role === "assistant"
                      ? "bg-white/5 border-white/10 rounded-tl-lg text-gray-200",
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-lg"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base",
                    msg.role === "assistant" ? "text-left" : "text-right"
                >
                  {msg.content}
                </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 sm:gap-4 animate-in fade-in-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500/80 to-purple-600/80 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-white">G</span>
                </div>
                <div className="max-w-[85%] sm:max-w-2xl px-4 sm:px-6 py-3 sm:py-5 bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl rounded-tl-lg backdrop-blur-sm flex items-center gap-2 sm:gap-3">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-blue-400" />
                  <span className="text-gray-300 text-sm sm:text-base">Grok is thinking...</span>
                </div>
              </div>
            )}

            {/* Image Generation Indicator */}
            {isGeneratingImage && (
              <div className="flex gap-3 sm:gap-4 animate-in fade-in-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-white">G</span>
                </div>
                <div className="max-w-[85%] sm:max-w-2xl px-4 sm:px-6 py-3 sm:py-5 bg-blue-900/20 border border-blue-500/30 rounded-2xl sm:rounded-3xl rounded-tl-lg backdrop-blur-sm flex items-center gap-2 sm:gap-3">
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-blue-300" />
                  <div className="flex-1">
                    <span className="text-blue-200 text-sm sm:text-base">Generating image with </span>
                    <strong className="text-blue-100">google/gemini-2.5-flash-image</strong>
                    <span className="text-blue-200 text-sm sm:text-base">...</span>
                    <Button 
                      onClick={stopGeneration}
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 text-blue-300 hover:text-white hover:bg-blue-500/50 ml-2 transition-all duration-200"
                    >
                      <Square className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Bottom Input Bar */}
      <div className="flex-shrink-0 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto w-full pb-4 sm:pb-6">
        <div className={cn(
          "bg-white/5 backdrop-blur-xl border transition-all duration-300 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl backdrop-saturate-150",
          isFocused ? "border-blue-500/50 shadow-blue-500/20" : "border-white/10"
        )}>
          <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Message Grok..."
              className="flex-1 min-h-[44px] max-h-32 resize-none bg-transparent border-0 outline-none text-white placeholder-gray-400 text-sm sm:text-base leading-relaxed p-3 -m-3 sm:-m-4 rounded-2xl sm:rounded-3xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0 m-0"
              rows={1}
              disabled={isTyping || isGeneratingImage}
            />
            <div className="flex items-center gap-1 sm:gap-2 h-10 flex-shrink-0">
              <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-9 px-2.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-xl gap-1 transition-all duration-200">
                Grok
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <Lightbulb className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                type="submit" 
                disabled={!input.trim() || isTyping || isGeneratingImage}
                className={cn(
                  "h-9 w-9 p-0 transition-all duration-200",
                  input.trim() && !isTyping && !isGeneratingImage
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/5 text-gray-400"
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TerminalChat;