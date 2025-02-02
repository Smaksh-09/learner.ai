"use client";
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface DotProps {
  left: string;
  top: string;
  deltaX: number;
  deltaY: number;
  duration: number;
  delay: number;
}

const Background: React.FC = () => {
  const dotCount = 100;

  // Generate properties for each dot only once
  const dots = useMemo((): DotProps[] => {
    return Array.from({ length: dotCount }, () => {
      const left = Math.random() * 100; // percentage
      const top = Math.random() * 100; // percentage
      const deltaX = (Math.random() - 0.5) * 20; // offset between -10 and 10
      const deltaY = (Math.random() - 0.5) * 20; // offset between -10 and 10
      const duration = 3 + Math.random() * 4; // animation duration between 3s and 7s
      const delay = Math.random() * 2; // delay up to 2s
      return {
        left: `${left}%`,
        top: `${top}%`,
        deltaX,
        deltaY,
        duration,
        delay,
      };
    });
  }, [dotCount]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      {dots.map((dot, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            left: dot.left,
            top: dot.top,
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: '#000',
          }}
          animate={{
            x: [0, dot.deltaX, 0],
            y: [0, dot.deltaY, 0],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Background;
