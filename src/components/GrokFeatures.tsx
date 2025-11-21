"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Rocket } from "lucide-react";

const GrokFeatures = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Intelligent Conversations",
      description: "Grok understands context and provides thoughtful, engaging responses that feel natural and helpful.",
      color: "from-orange-400 to-pink-500",
    },
    {
      icon: Brain,
      title: "Advanced Reasoning",
      description: "Powered by xAI's cutting-edge technology, Grok can tackle complex problems and explain them clearly.",
      color: "from-pink-400 to-purple-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant responses with minimal latency. Grok is optimized for speed without sacrificing quality.",
      color: "from-purple-400 to-orange-500",
    },
    {
      icon: Rocket,
      title: "Always Learning",
      description: "Grok continuously improves and adapts, staying up-to-date with the latest knowledge and capabilities.",
      color: "from-orange-500 to-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/50 via-transparent to-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent ml-4">
              Grok
            </span>
            ?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of AI conversation with features designed to make your interactions more natural, helpful, and productive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group p-8 bg-gradient-to-br from-gray-800/50 to-black/80 border border-white/10 rounded-2xl hover:border-white/20 transition-all backdrop-blur-xl"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrokFeatures;