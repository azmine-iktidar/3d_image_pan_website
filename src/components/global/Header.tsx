"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HEADER_LINKS } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();

  const containerVariants = {
    hidden: isMobile ? { height: 0, opacity: 0 } : { width: 0, opacity: 0 },
    visible: isMobile
      ? {
          height: "auto",
          opacity: 1,
          transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.05,
          },
        }
      : {
          width: "auto",
          opacity: 1,
          transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.05,
          },
        },
  };

  const linkVariants = {
    hidden: isMobile ? { y: 20, opacity: 0 } : { x: 20, opacity: 0 },
    visible: isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 },
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <header className="sticky left-0 top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-between">
            <Link
              href="https://y2mgt.com"
              target="_black"
              className="flex items-center gap-2 text-xl font-bold text-gray-800 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
            >
              <Image
                src="/images/y2-logo.png" // Replace with your image path
                alt="Y2 World Logo"
                width={25}
                height={20}
                className="object-contain"
              />
            </Link>
            <div
              className={cn(
                "relative",
                isMobile ? "flex flex-col items-end" : "flex items-center",
              )}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
            >
              {!isMobile && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex overflow-hidden"
                    >
                      {HEADER_LINKS.map((link) => (
                        <motion.div
                          key={link.label}
                          variants={linkVariants}
                          className="mr-4"
                        >
                          {link.tag ? (
                            <p
                              aria-disabled
                              className="cursor-not-allowed whitespace-nowrap text-gray-300"
                            >
                              {link.label}
                            </p>
                          ) : (
                            <Link
                              href={link.url}
                              className="whitespace-nowrap text-white transition-colors hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                            >
                              {link.label}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              <div className="cursor-pointer">
                <span className="text-lg font-semibold text-white">
                  Explore
                </span>
              </div>
              {isMobile && (
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute top-8 flex w-48 flex-col items-end overflow-hidden"
                    >
                      {HEADER_LINKS.map((link) => (
                        <motion.div
                          key={link.label}
                          variants={linkVariants}
                          className="mt-3 text-right"
                        >
                          {link.tag ? (
                            <p
                            aria-disabled
                            className="cursor-not-allowed whitespace-nowrap text-gray-300"
                          >
                            {link.label}
                          </p>
                          ) : (
                            <Link
                              href={link.url}
                              className="whitespace-nowrap text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
                              onClick={handleLinkClick}
                            >
                              {link.label}
                            </Link>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </nav>
        </div>
      </header>
      <motion.div
        className={cn(
          "absolute left-0 top-0 z-[9] h-screen w-screen bg-black bg-opacity-[0] bg-clip-padding backdrop-blur-3xl backdrop-filter",
          isExpanded ? "" : "pointer-events-none",
          // isMobile ? "hidden" : "",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
