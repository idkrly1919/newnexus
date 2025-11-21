import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GrokHeader from "./components/GrokHeader";
import GrokHero from "./components/GrokHero";
import GrokFeatures from "./components/GrokFeatures";
import GrokChatWindow from "./components/GrokChatWindow";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-black">
          <GrokHeader />
          <Routes>
            <Route path="/" element={
              <>
                <GrokHero />
                <GrokFeatures />
                <div className="py-8">
                  <div className="max-w-7xl mx-auto px-4">
                    <GrokChatWindow />
                  </div>
                </div>
              </>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;