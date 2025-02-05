"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      title: "AI-Powered Learning",
      description: "Advanced algorithms adapt to your learning style and pace, providing personalized education paths.",
      icon: "🤖"
    },
    {
      title: "Interactive Quizzes",
      description: "Engage with dynamic quizzes that help reinforce your understanding of complex topics.",
      icon: "📝"
    },
    {
      title: "Real-world Applications",
      description: "Learn how concepts apply to real-world scenarios with practical examples and case studies.",
      icon: "🌍"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and progress indicators.",
      icon: "📊"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-20 bg-white" ref={ref} id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
           Why Choose Us?
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-black mx-auto mb-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Revolutionizing education through AI-powered personalized learning experiences. 
            Our platform adapts to your unique learning style and pace.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-black transition-colors duration-300"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold mb-2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 1 }}
            >
              1000+
            </motion.div>
            <p className="text-gray-600">Active Learners</p>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold mb-2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 1.2 }}
            >
              50+
            </motion.div>
            <p className="text-gray-600">Topics Covered</p>
          </div>
          <div className="text-center">
            <motion.div 
              className="text-4xl font-bold mb-2"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 1.4 }}
            >
              95%
            </motion.div>
            <p className="text-gray-600">Success Rate</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <motion.button
            className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
          >
            Start Learning Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
