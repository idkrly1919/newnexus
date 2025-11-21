"use client";

import { toast } from "sonner";

// Using the actual API key provided
const OPENROUTER_API_KEY = "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";

if (!OPENROUTER_API_KEY) {
  console.warn("OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your environment variables.");
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  reasoning_details?: any;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
    reasoning_details?: any;
  }>;
  temperature?: number;
  max_tokens?: number;
  reasoning?: {
    enabled: boolean;
  };
}

export class OpenRouterClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || OPENROUTER_API_KEY!;
  }

  async chat(
    messages: Array<{ 
      role: "user" | "assistant" | "system"; 
      content: string; 
      reasoning_details?: any; 
    }>,
    signal?: AbortSignal
  ): Promise<{ content: string; reasoning_details?: any }> {
    try {
      // Check if this is the first message or if we need to continue reasoning
      const isReasoningEnabled = messages.length === 1 || 
        messages.some(msg => msg.reasoning_details !== undefined);

      const requestBody: any = {
        model: "x-ai/grok-4.1-fast:free",
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
          ...(msg.reasoning_details && { reasoning_details: msg.reasoning_details })
        })),
        temperature: 0.7,
        max_tokens: 4000,
      };

      // Enable reasoning for the first call or when continuing
      if (isReasoningEnabled) {
        requestBody.reasoning = { enabled: true };
      }

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ChatGPT Clone",
        },
        body: JSON.stringify(requestBody),
        signal,
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      
      return {
        content: assistantMessage.content,
        reasoning_details: assistantMessage.reasoning_details
      };
    } catch (error) {
      console.error("Chat API error:", error);
      throw error;
    }
  }

  async generateImage(prompt: string, signal?: AbortSignal): Promise<string> {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "ChatGPT Clone",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: `Generate an image based on this description: "${prompt}". Please provide a detailed, vivid description of the image that could be generated.`,
            },
          ],
          temperature: 0.8,
          max_tokens: 1000,
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Image generation API error:", error);
      throw error;
    }
  }
}

export const openRouterClient = new OpenRouterClient();