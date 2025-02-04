"use client";
import { motion } from "framer-motion";
import React from "react";

const features = [
  {
    title: "Personalized Quizzes",
    description: "AI creates quizzes tailored to your learning needs based on chosen topics.",
    icon: "📚",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and performance insights.",
    icon: "📈",
  },
  {
    title: "Interactive Learning",
    description: "Engage with immersive quiz experiences that make learning effective.",
    icon: "🎮",
  },
  {
    title: "Instant Feedback",
    description: "Receive immediate recommendations to improve continuously.",
    icon: "⚡",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    }
  },
};

export default function Features() {
  return (
    <motion.section 
      className="py-24 px-4 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl font-bold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Transform Your Learning Experience
          </motion.h2>
          <motion.p
            className="text-xl text-black/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover powerful features designed to elevate your educational journey through AI-powered personalization.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative p-8 rounded-2xl border-2 border-black bg-white hover:bg-black/5 transition-colors"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0.9 }}
              />
              
              <motion.div
                className="text-6xl mb-6 relative inline-block"
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.8, repeat: Infinity }
                }}
              >
                {feature.icon}
              </motion.div>
              
              <motion.h3
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p
                className="text-lg text-black/80 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
