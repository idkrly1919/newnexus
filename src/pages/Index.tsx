"use client";

import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = "Grok - Your AI Companion";
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* The actual content is now handled by App.tsx with Grok components */}
      <MadeWithDyad />
    </div>
  );
};

export default Index;