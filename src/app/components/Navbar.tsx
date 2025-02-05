"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
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
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.id;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: sectionId === "home" ? 0 : element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "about", label: "About" },
    { id: "pricing", label: "Pricing" },
  ];

  return (
    <motion.div
      className={`sticky top-0 z-50 h-16 w-full flex items-center justify-between px-6 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Logo */}
      <motion.h2
        className="text-2xl font-bold text-black cursor-pointer"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => scrollToSection("home")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Learner.ai
      </motion.h2>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-black">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`relative px-2 py-1 hover:text-gray-600 focus:outline-none ${
              activeSection === item.id ? "text-black" : "text-gray-600"
            }`}
            custom={index}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-black"
                layoutId="activeSection"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Right: Clerk Authentication */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <Link href="/sign-in">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button className="px-4 py-2">Sign In</Button>
            </motion.div>
          </Link>
          <Link href="/sign-up">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="px-4 py-2" variant="secondary">
                Sign Up
              </Button>
            </motion.div>
          </Link>
        </SignedOut>

        <SignedIn>
          <motion.div 
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.2 }}
          >
            <UserButton afterSignOutUrl="/" />
          </motion.div>
        </SignedIn>
      </div>
    </motion.div>
  );
}
