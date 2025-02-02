"use client";

import { motion } from "framer-motion";
import React from "react";

const features = [
  {
    title: "Personalized Quizzes",
    description:
      "AI creates quizzes tailored specifically to your learning needs based on the topics you choose.",
    icon: "📚",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and performance tracking.",
    icon: "📈",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with immersive quiz experiences that make learning fun and effective.",
    icon: "🎮",
  },
  {
    title: "Instant Feedback",
    description:
      "Receive immediate feedback and recommendations to help you improve continuously.",
    icon: "⚡",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Features() {
  return (
    <motion.div
      className="py-20 px-4 text-black bg-transparent"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Features
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover what makes Learner.ai the perfect companion for your
          personalized learning journey.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-lg shadow-lg border border-gray-200 bg-white/50 backdrop-blur-sm flex flex-col items-center"
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="text-5xl mb-4"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {feature.icon}
            </motion.div>
            <motion.h3 className="text-xl font-semibold mb-2">
              {feature.title}
            </motion.h3>
            <motion.p className="text-gray-700 text-center">
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
