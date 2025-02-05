"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

interface UserProgress {
  topic: string;
  score: number;
  total: number;
  timestamp: string;
}

interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  totalQuizzesTaken: number;
  averageScore: number;
  progress: UserProgress[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "2024-01-01",
    totalQuizzesTaken: 15,
    averageScore: 85,
    progress: [
      { topic: "JavaScript", score: 8, total: 10, timestamp: "2024-03-15" },
      { topic: "React", score: 9, total: 10, timestamp: "2024-03-14" },
      { topic: "TypeScript", score: 7, total: 10, timestamp: "2024-03-13" },
      { topic: "Next.js", score: 9, total: 10, timestamp: "2024-03-12" },
      { topic: "CSS", score: 8, total: 10, timestamp: "2024-03-11" },
    ]
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Profile Header */}
        <motion.div 
          variants={item}
          className="bg-black text-white rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-gray-300">{profile.email}</p>
              <p className="text-sm text-gray-400">Joined {new Date(profile.joinedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Total Quizzes Taken</h2>
            <motion.p 
              className="text-4xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {profile.totalQuizzesTaken}
            </motion.p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">Average Score</h2>
            <motion.p 
              className="text-4xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {profile.averageScore}%
            </motion.p>
          </div>
        </motion.div>

        {/* Progress Graph */}
        <motion.div 
          variants={item}
          className="bg-white rounded-xl p-6 border border-gray-200 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">Learning Progress</h2>
          <div className="space-y-4">
            {profile.progress.map((item, index) => (
              <motion.div 
                key={item.topic}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{item.topic}</span>
                  <span className="text-sm font-medium">{item.score}/{item.total}</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.score / item.total) * 100}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full bg-black"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          variants={item}
          className="bg-white rounded-xl p-6 border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {profile.progress.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div>
                  <h3 className="font-medium">{activity.topic} Quiz</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    (activity.score / activity.total) >= 0.7 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {Math.round((activity.score / activity.total) * 100)}%
                  </span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={`w-2 h-2 rounded-full ${
                      (activity.score / activity.total) >= 0.7 ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
