"use client";

import { toast } from "sonner";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.warn("OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your environment variables.");
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  image?: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

export class OpenRouterClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || OPENROUTER_API_KEY!;
  }

  async chat(
    messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
    signal?: AbortSignal
  ): Promise<string> {
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
          model: "xai:grok-2-180613",
          messages,
          temperature: 0.7,
          max_tokens: 4000,
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
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
          model: "google:gemini-2.5-flash-lite",
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