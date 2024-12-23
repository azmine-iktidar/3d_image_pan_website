/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import { useEffect, useState, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useMotionValue } from "framer-motion";

import { type HotspotType } from "@/constnts";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Hotspot from "../global/Hotspot";

export default function RoomMobile({
  hotspots,
  imgSource,
}: {
  hotspots: HotspotType[];
  imgSource: StaticImageData;
}) {
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

    // Prevent body scrolling when component mounts
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";

    // Initial check
    checkPanningState();

    // Add resize listener
    window.addEventListener("resize", checkPanningState);

    return () => {
      // Cleanup: Remove event listener and restore scrolling
      window.removeEventListener("resize", checkPanningState);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [scaledWidth, x]);

  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 bg-black">
      <section className="h-full w-full">
        <div className="h-full w-full">
          <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden"
            id="room"
          >
            <motion.div
              style={{
                width: cn(isMobile ? `${scaledWidth}px` : `${windowWidth}px`),
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
              className={`relative h-full ${
                isPanEnabled
                  ? "cursor-grab touch-none active:cursor-grabbing"
                  : ""
              } md:w-full`}
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

                <div className="absolute inset-0">
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
