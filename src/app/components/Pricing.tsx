"use client";
import { motion } from "framer-motion";

export default function Pricing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-white py-20 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h2 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Pricing
        </motion.h2>
        <motion.p
          className="text-lg text-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose the plan that works best for you
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
        {/* Free Plan Card */}
        <motion.div
          className="w-full md:w-1/2 bg-white border-2 border-black rounded-xl p-8 shadow-lg"
          variants={cardVariants}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="text-center space-y-6">
            <div className="text-4xl mb-6">🎈</div>
            <h3 className="text-2xl font-bold">Free Forever</h3>
            <p className="text-black/80">Perfect for individual learners</p>
            <div className="text-4xl font-bold">$0</div>
            <ul className="space-y-3 text-black/80">
              <li>✓ Basic features</li>
              <li>✓ Community support</li>
              <li>✓ Limited quizzes</li>
            </ul>
            <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-black/90 transition-colors
            ">
              Get Started
            </button>
          </div>
        </motion.div>

        {/* Premium Plan Card */}
        <motion.div
          className="w-full md:w-1/2 bg-black text-white border-2 border-black rounded-xl p-8 shadow-lg relative overflow-hidden"
          variants={cardVariants}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="absolute top-3 right-3 bg-white/10 px-3 py-1 rounded-full text-sm">
            Coming Soon
          </div>
          <div className="text-center space-y-6">
            <div className="text-4xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold">Premium</h3>
            <p className="text-white/80">Enhanced learning experience</p>
            <div className="text-4xl font-bold">$5<span className="text-lg">/month</span></div>
            <ul className="space-y-3 text-white/80">
              <li>✓ All free features</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ Unlimited quizzes</li>
            </ul>
            <button 
              className="w-full py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
              disabled
            >
              Notify Me
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
