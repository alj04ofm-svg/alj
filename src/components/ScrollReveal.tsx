"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  scale?: number;
  blur?: boolean;
  stagger?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = 0.96,
  blur = true,
  stagger = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directionOffset = {
    up: { y: 28, x: 0 },
    down: { y: -28, x: 0 },
    left: { y: 0, x: 28 },
    right: { y: 0, x: -28 },
    none: { y: 0, x: 0 },
  };

  const blurInitial = blur ? "blur(4px)" : "blur(0px)";
  const blurAnimate = "blur(0px)";

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        scale,
        filter: blurInitial,
        ...directionOffset[direction],
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              filter: blurAnimate,
              y: 0,
              x: 0,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
        ...(stagger > 0 && stagger < 1
          ? {
              viewport: { once: true, margin: "-80px" },
            }
          : {}),
      }}
    >
      {stagger > 0
        ? React.Children.map(children, (child, i) => {
            if (!React.isValidElement(child)) return child;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)", ...directionOffset[direction] }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, x: 0 }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: delay + i * stagger,
                }}
              >
                {child}
              </motion.div>
            );
          })
        : children}
    </motion.div>
  );
}
