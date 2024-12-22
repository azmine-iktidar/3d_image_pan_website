"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface HotspotProps {
  id: string;
  x: number;
  y: number;
  title: string;
  url: string;
  type: "circle" | "arrow" | "object";
  className?: string;
}

export default function Hotspot({ x, y, title, url, className }: HotspotProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const debouncedResize = debounce(checkMobile, 100);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const debounce = (fn: (...args: unknown[]) => void, ms: number) => {
    let timer: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  };

  const HotspotContent = () => (
    <Link href={url} className="block text-black">
      {title}
    </Link>
  );

  // Ping animation variants
  const pingVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: {
      scale: 2.5,
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  const HotspotDot = () => (
    <motion.span
      className="relative block h-[11px] w-[11px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main dot */}
      <motion.span
        className="absolute inset-0 block rounded-full bg-white"
        animate={{
          boxShadow: [
            "0 0 10px 2px rgba(255,255,255,0.3)",
            "0 0 15px 3px rgba(255,255,255,0.4)",
            "0 0 10px 2px rgba(255,255,255,0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1 }}
      />

      {/* Ping circles - only show when not hovered/open */}
      <AnimatePresence>
        {!isHovered && !isOpen && (
          <>
            <motion.span
              className="absolute inset-0 block rounded-full bg-white/30"
              variants={pingVariants}
              initial="initial"
              animate="animate"
            />
            <motion.span
              className="absolute inset-0 block rounded-full bg-white/20"
              variants={pingVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "0.5s" }}
            />
            <motion.span
              className="absolute inset-0 block rounded-full bg-white/10"
              variants={pingVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "1s" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Active/Hover ring effect */}
      <AnimatePresence>
        {(isHovered || isOpen) && (
          <motion.div
            className="absolute -inset-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Outer ring */}
            <span className="absolute inset-0 block rounded-full border border-white/20 bg-white/5" />
            {/* Multiple expanding rings */}
            <span className="absolute inset-1 block rounded-full border border-white/10 bg-white/5" />
            <span className="absolute inset-2 block rounded-full border border-white/5 bg-white/5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );

  // Mobile Popover
  if (isMobile) {
    return (
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <motion.button
            className={cn(
              "group z-20 block",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              className,
            )}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <HotspotDot />
          </motion.button>
        </PopoverTrigger>
        <PopoverContent
          className="w-fit rounded-xl bg-white p-3 font-bold text-black"
          side="top"
          sideOffset={15}
          align="center"
        >
          <HotspotContent />
        </PopoverContent>
      </Popover>
    );
  }

  // Desktop Tooltip
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <motion.div
            className={cn(
              "group z-20 block",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              className,
            )}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            <Link href={url}>
              <HotspotDot />
            </Link>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="rounded-full bg-white px-4 py-2 font-bold text-black"
          sideOffset={15}
        >
          <HotspotContent />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
