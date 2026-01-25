"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

import { Heart } from "@/components/icons/Heart";
import { cn } from "@/lib/helpers";

export const MAX_LIKES_PER_USER = 10;

interface LikeButtonProps {
  count: number;
  handleLike: (count: number) => void;
  disable?: boolean;
}

function AnimatedDigit({
  digit,
  direction,
}: {
  digit: string;
  direction: "up" | "down";
}) {
  return (
    <div className="relative inline-flex h-[1em] w-[0.6em] items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: direction === "up" ? "100%" : "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: direction === "up" ? "-100%" : "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.8,
          }}
          className="absolute leading-none"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [prevValue, setPrevValue] = useState(value);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    setDirection(value > prevValue ? "up" : "down");
    setPrevValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const digits = String(value).split("");

  return (
    <span className="inline-flex leading-none tabular-nums">
      {digits.map((digit, i) => (
        <AnimatedDigit
          key={`${i}-${digit}`} // daha stabil
          digit={digit}
          direction={direction}
        />
      ))}
    </span>
  );
}

// Generate random particles for each click
function generateParticles(intensity: number) {
  const count = Math.floor(8 + intensity * 10); // 8-18 particles
  const baseSpread = 40 + intensity * 30; // 40-70px spread
  const baseSize = 6 + intensity * 6; // 6-12px size
  const baseDuration = 0.5 + intensity * 0.3; // 0.5-0.8s duration

  return Array.from({ length: count }, () => ({
    angle: Math.random() * Math.PI * 2,
    distance: baseSpread * (0.7 + Math.random() * 0.6),
    size: baseSize * (0.6 + Math.random() * 0.6),
    duration: baseDuration * (0.8 + Math.random() * 0.4),
  }));
}

export function LikeButton({
  count,
  handleLike,
  disable = false,
}: LikeButtonProps) {
  const [localLikeCount, setLocalLikeCount] = useState<number>(0);
  const [canLike, setCanLike] = useState<boolean>(true);

  const [isShaking, setIsShaking] = useState(false);
  const [particles, setParticles] = useState<
    ReturnType<typeof generateParticles>
  >([]);
  const [particleKey, setParticleKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Subtle button scale (constant, not intensity-based)
  const buttonScale = useMotionValue(1);
  const buttonSpring = useSpring(buttonScale, { stiffness: 400, damping: 25 });

  // Bouncier heart scale (intensity-based)
  const heartScale = useMotionValue(1);
  const heartSpring = useSpring(heartScale, {
    stiffness: 500,
    damping: 15,
    mass: 0.5,
  });

  const handleClick = () => {
    if (localLikeCount + 1 >= MAX_LIKES_PER_USER) {
      // At max likes - shake it!
      setCanLike(false);
      setLocalLikeCount((prev) => prev + 1);
      setIsShaking(true);
      heartScale.set(1.2);
      setTimeout(() => {
        setIsShaking(false);
        heartScale.set(1);
      }, 500);

      return;
    } else if (localLikeCount < MAX_LIKES_PER_USER) {
      setLocalLikeCount((prev) => prev + 1);
    }

    // Generate new random particles with intensity based on likes
    const intensity = (localLikeCount + 1) / MAX_LIKES_PER_USER;
    setParticles(generateParticles(intensity));
    setParticleKey((k) => k + 1);

    // Subtle button bounce
    buttonScale.set(1.02);
    setTimeout(() => buttonScale.set(1), 100);

    // Bouncier heart
    heartScale.set(1.18 + intensity * 0.15);
    setTimeout(() => heartScale.set(1), 150);

    handleLike(localLikeCount + 1);
  };

  const handlePointerDown = () => {
    buttonScale.set(0.97);
    heartScale.set(0.88);
  };

  const handlePointerUp = () => {
    if (!isShaking) {
      buttonScale.set(1);
      heartScale.set(1);
    }
  };

  const isFilled = localLikeCount > 0;
  const fillProgress = localLikeCount / MAX_LIKES_PER_USER;

  // Color intensity based on how many likes
  const heartColor = isFilled
    ? `hsl(0, ${70 + fillProgress * 30}%, ${55 - fillProgress * 10}%)`
    : undefined;

  return (
    <motion.div
      style={{ scale: buttonSpring }}
      animate={isShaking ? { x: [0, -4.5, 4.5, -4.5, 4.5, -2.7, 2.7, 0] } : {}}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <button
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        disabled={!canLike || disable}
        className={cn(
          "hover:bg-secondary dark:bg-elevated dark:shadow-contrast text-quaternary flex items-center flex-row gap-1 rounded-full bg-white py-1.5 px-2.5 shadow-sm ring-[0.5px] ring-black/10 disabled:opacity-100 dark:text-neutral-500 dark:ring-white/10",
          isFilled && "text-red-500 hover:text-red-600",
          !canLike || disable ? "cursor-not-allowed" : "cursor-pointer",
        )}
        style={isFilled ? { color: heartColor } : undefined}
      >
        <div className="flex">
          <motion.div style={mounted ? { scale: heartSpring } : undefined}>
            <Heart size={20} className="fill-current transition-all" />
          </motion.div>

          {/* Burst particles on click - outside spring wrapper for linear animation */}
          <AnimatePresence>
            {particles.length > 0 && (
              <motion.div
                key={particleKey}
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {particles.map((p, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full bg-red-400"
                    style={{ width: p.size, height: p.size }}
                    initial={{ x: "-50%", y: "-50%", scale: 1, opacity: 1 }}
                    animate={{
                      x: `calc(-50% + ${Math.cos(p.angle) * p.distance}px)`,
                      y: `calc(-50% + ${Math.sin(p.angle) * p.distance}px)`,
                      scale: 0,
                      opacity: 0,
                    }}
                    transition={{ duration: p.duration, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="-translate-x-px translate-y-px leading-none">
          <AnimatedNumber value={count + localLikeCount} />
        </span>
      </button>
    </motion.div>
  );
}
