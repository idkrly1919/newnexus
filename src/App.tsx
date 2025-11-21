"use client";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useChat } from "@/lib/use-chat";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import NotFound from "./pages/NotFound";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const chat = useChat();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="h-screen flex bg-black text-white overflow-hidden">
            <Sidebar clearChat={chat.clearChat} />
            <div className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<ChatArea {...chat} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;