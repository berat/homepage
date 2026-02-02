"use client";

import { motion } from "motion/react";

export function OpenToWorkFixed() {
  return (
    <a
      href="mailto:me@beratbozkurt.net"
      className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6"
      aria-label="Send email to Berat Bozkurt"
    >
      <div className="max-w-[calc(100vw-2rem)] sm:max-w-none">
        <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-3 py-2 text-xs backdrop-blur sm:px-4 sm:text-sm">
          {/* Icon */}
          <div className="relative flex items-center justify-center">
            {/* Pulse background */}
            <motion.span
              className="absolute inline-block h-2 w-2 rounded-full bg-green-700"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Solid dot */}
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-green-700" />
          </div>

          <span className="whitespace-nowrap text-gray-600 text-sm">
            Open to new job opportunities
          </span>
        </div>
      </div>
    </a>
  );
}
