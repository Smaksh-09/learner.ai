"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItemVariants = {
  hidden: { y: -15, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, type: "tween", ease: "easeOut", duration: 0.5 },
  }),
};

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-colors ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <motion.h2
            className="text-2xl font-bold text-black cursor-pointer"
            variants={navItemVariants}
            custom={0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learner.ai
          </motion.h2>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {["Features", "About", "Pricing"].map((item, index) => (
            <motion.button
              key={item}
              variants={navItemVariants}
              custom={index + 1}
              className="text-black hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
