"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HEADER_LINKS } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <header className="sticky left-0 top-0 z-10 bg-transparent">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-gray-800 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              Logo
            </Link>
            <div className="flex items-center space-x-4">
              {HEADER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  className="text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
      <motion.div
        className={cn(
          "absolute left-0 top-0 z-[9] h-screen w-screen bg-black bg-opacity-[0] bg-clip-padding backdrop-blur-3xl backdrop-filter",
          hovered ? "" : "pointer-events-none",
          useIsMobile() ? "hidden" : "",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
