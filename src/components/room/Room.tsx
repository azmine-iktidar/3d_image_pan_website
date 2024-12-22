"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import imgSource from "@public/images/image1.png";
import { hotspots } from "@/constnts";
import Hotspot from "@/components/global/Hotspot";

export default function Room() {
  const [isPanEnabled, setIsPanEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get image dimensions
  const imageAspectRatio = imgSource.width / imgSource.height;
  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const scaledWidth = viewportHeight * imageAspectRatio;
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;

  // Calculate maximum drag distance based on image dimensions
  const maxDragDistance = Math.max(0, scaledWidth - windowWidth);

  // Motion value for x position
  const x = useMotionValue(0);

  useEffect(() => {
    // Check if panning should be enabled
    const checkPanningState = () => {
      const currentWindowWidth = window.innerWidth;
      const shouldPanBeEnabled = scaledWidth > currentWindowWidth;
      setIsPanEnabled(shouldPanBeEnabled);

      // Reset position when panning is disabled
      if (!shouldPanBeEnabled) {
        x.set(0);
      }
    };

    // Initial check
    checkPanningState();

    // Add resize listener
    window.addEventListener("resize", checkPanningState);
    return () => window.removeEventListener("resize", checkPanningState);
  }, [scaledWidth, x]);

  return (
    <div className="bg-black">
      <section className="mx-auto">
        <div className="mx-auto h-screen">
          <div
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden"
            id="room"
          >
            <motion.div
              style={{
                width: `${scaledWidth}px`,
                height: "100%",
                x,
                touchAction: isPanEnabled ? "none" : "auto",
              }}
              drag={isPanEnabled ? "x" : false}
              dragConstraints={{
                left: -maxDragDistance,
                right: 0,
              }}
              dragElastic={0.1}
              dragTransition={{
                power: 0.1,
                timeConstant: 250,
              }}
              className={`relative h-full ${isPanEnabled ? "cursor-grab touch-none active:cursor-grabbing" : ""} md:w-full`}
              initial={{
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              animate={{
                opacity: 1,
              }}
            >
              <div className="relative h-full">
                <Image
                  src={imgSource}
                  alt=""
                  fill
                  className="select-none object-cover"
                  priority
                  sizes={`${scaledWidth}px`}
                  quality={100}
                  draggable={false}
                />

                <div className="absolute left-0 top-0 h-full w-full">
                  {hotspots.map((hotspot) => (
                    <Hotspot key={hotspot.id} {...hotspot} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
