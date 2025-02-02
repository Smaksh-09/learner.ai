"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="h-16 w-full flex items-center justify-between px-6 bg-gray-900 text-white">
      {/* Left: Logo */}
      <motion.h2 
        className="text-xl font-semibold"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Learner.ai
      </motion.h2>

      {/* Center: Navigation Links */}
      <div className="flex space-x-6">
        {["Home", "Pricing", "Features", "About"].map((item, index) => (
          <motion.a
            key={item}
            href="#"
            className="hover:text-gray-400"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1, color: "#ddd" }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      {/* Right: Clerk Authentication */}
      <div className="flex space-x-4">
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>
  );
}
