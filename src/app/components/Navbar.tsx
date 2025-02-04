"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const navItemVariants = {
  hidden: { y: -15, opacity: 0 },
  //@ts-ignore
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.15, type: "tween", ease: "easeOut", duration: 0.5 },
  }),
};

export default function NavBar() {
  return (
    <motion.div
      className="sticky top-0 z-50 h-16 w-full flex items-center justify-between px-6 text-black bg-white/80 backdrop-blur-sm shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Logo */}
      <motion.h2
        className="text-2xl font-bold text-black"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Learner.ai
      </motion.h2>

      {/* Center: Navigation Links */}
      <nav className="hidden md:flex space-x-6 text-black">
        {["Home", "Pricing", "Features", "Profile"].map((item, index) => (
          <motion.a
            key={item}
            href="#"
            className="relative hover:text-gray-600 focus:outline-none"
            custom={index}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, color: "#ccc", transition: { duration: 0.2 } }}
          >
            {item}
            <motion.span
              className="absolute left-0 bottom-[-2px] h-0.5 w-full bg-gray-600"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.a>
        ))}
      </nav>

      {/* Right: Clerk Authentication */}
      <div className="flex items-center space-x-4">
        <SignedOut>
          <Link href="/sign-in">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="px-4 py-2">Sign In</Button>
            </motion.div>
          </Link>
          <Link href="/sign-up">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="px-4 py-2" variant="secondary">
                Sign Up
              </Button>
            </motion.div>
          </Link>
        </SignedOut>

        <SignedIn>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
            <UserButton afterSignOutUrl="/" />
          </motion.div>
        </SignedIn>
      </div>
    </motion.div>
  );
}
