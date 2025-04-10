"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type AnimationVariant = "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight";

const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.5 } },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.5 } },
  },
};

interface MotionWrapperProps {
  children: ReactNode;
  animate?: AnimationVariant;
  className?: string;
  delay?: number;
  duration?: number;
}

export function MotionWrapper({
  children,
  animate = "fadeIn",
  className,
  delay = 0,
  duration = 0.5,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[animate]}
      transition={{
        duration,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
