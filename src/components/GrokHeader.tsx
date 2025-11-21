"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const GrokHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">∞</span>
            </div>
            <span className="text-white font-semibold text-lg">Grok</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Features</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">API</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Blog</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              className="hidden sm:flex text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-sm"
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-6 py-2 rounded-full transition-all text-sm font-medium"
            >
              Try Grok Free
            </Button>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/10"
          >
            <div className="py-4 space-y-4">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Features</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Pricing</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">API</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Blog</a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default GrokHeader;