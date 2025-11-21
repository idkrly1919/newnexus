"use client";

import { useState, useCallback, useRef } from "react";
import { openRouterClient, Message } from "./openrouter";
import { toast } from "sonner";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isTyping || isGeneratingImage) return;

      const userMessage = {
        role: "user" as const,
        content,
      };

      addMessage(userMessage);

      // Check if this is an image generation request
      const imageKeywords = ["generate image", "create image", "draw", "paint", "visualize", "show me"];
      const isImageRequest = imageKeywords.some(keyword => 
        content.toLowerCase().includes(keyword)
      );

      if (isImageRequest) {
        setIsGeneratingImage(true);
        abortControllerRef.current = new AbortController();
        
        try {
          const response = await openRouterClient.generateImage(content, abortControllerRef.current.signal);
          addMessage({
            role: "assistant",
            content: response,
          });
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            toast.info("Image generation cancelled");
          } else {
            console.error("Image generation failed:", error);
            addMessage({
              role: "assistant",
              content: "I'm sorry, I couldn't generate an image right now. Please try again.",
            });
          }
        } finally {
          setIsGeneratingImage(false);
          abortControllerRef.current = null;
        }
      } else {
        setIsTyping(true);
        abortControllerRef.current = new AbortController();
        
        try {
          // Prepare messages with reasoning details if they exist
          const messagesWithReasoning = messages.map(msg => ({
            role: msg.role,
            content: msg.content,
            ...(msg.reasoning_details && { reasoning_details: msg.reasoning_details })
          }));

          const response = await openRouterClient.chat([...messagesWithReasoning, userMessage], abortControllerRef.current.signal);
          
          addMessage({
            role: "assistant",
            content: response.content,
            reasoning_details: response.reasoning_details,
          });
        } catch (error) {
          if (error instanceof Error && error.name === 'AbortError') {
            toast.info("Chat cancelled");
          } else {
            console.error("Chat API error:", error);
            addMessage({
              role: "assistant",
              content: "I'm sorry, I'm having trouble responding right now. Please try again.",
            });
          }
        } finally {
          setIsTyping(false);
          abortControllerRef.current = null;
        }
      }
    },
    [messages, isTyping, isGeneratingImage, addMessage]
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsTyping(false);
      setIsGeneratingImage(false);
      toast.info("Generation stopped");
    }
  }, []);

  return {
    messages,
    isTyping,
    isGeneratingImage,
    sendMessage,
    clearChat,
    stopGeneration,
  };
};