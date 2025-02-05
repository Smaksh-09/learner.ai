"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const[inputvalue,setInputValue]=useState("");
  const router=useRouter();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleOnclick = () => {
    router.push(`/quiz?topic=${encodeURIComponent(inputvalue)}`);
  }
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-20 px-4 text-black"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        className="text-4xl font-bold mb-4"
        variants={item}
      >
        Your Personalized Learning Journey Starts Here!
      </motion.h1>
      <motion.p
        className="text-lg mb-8 max-w-2xl"
        variants={item}
      >
        Take this quick quiz to assess your current level. Based on your score, we'll provide personalized learning content to help you improve!
      </motion.p>
      <motion.div
        className="flex w-full max-w-md space-x-2"
        variants={item}
      >
        <input
         value={inputvalue}
          type="text"
          placeholder="What do you want to learn today?"
          className="flex-1 p-3 rounded-l-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e)=>{setInputValue(e.target.value)}}
        />
        <button className="bg-black p-3 rounded-r-md hover:bg-gray-800 transition-colors text-white "
        onClick={handleOnclick}>
          Generate Quiz
        </button>
      </motion.div>
    </motion.div>
  );
}
