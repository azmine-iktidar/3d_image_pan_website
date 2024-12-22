"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import imgSource from "@public/images/image1.png";
import { hotspots } from "@/constnts";
import Hotspot from "@/components/global/Hotspot";
import { cn } from "@/lib/utils";

export default function Room() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mouse events for panning
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft ?? 0));
    setScrollLeft(containerRef.current?.scrollLeft ?? 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    e.preventDefault();
    if (!containerRef.current) return;

    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch events for mobile panning
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!isDragging) {
      setStartX(e.pageX);
    }
    setStartX(e.touches[0].pageX - (containerRef.current?.offsetLeft ?? 0));
    setScrollLeft(containerRef.current?.scrollLeft ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[51] flex h-screen w-screen items-center justify-center bg-white duration-1000">
        <h2 className="loader-title font-semibold">
          Loading Pan and Zoom Image Viewer...
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-black">
      <section>
        <div className="room-wrapper h-screen">
          <div
            ref={containerRef}
            className={cn(
              "relative h-screen w-full overflow-x-auto overflow-y-hidden",
              isDragging ? "max-md:cursor-grabbing" : "max-md:cursor-grab",
            )}
            id="room"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
          >
            <div className="relative h-full w-[200vw] md:w-full">
              <div className="relative h-full">
                <Image
                  src={imgSource}
                  alt=""
                  fill
                  className="select-none object-cover"
                  priority
                  sizes="(max-width: 768px) 200vw, 100vw"
                  quality={100}
                />

                <div className="absolute left-0 top-0 h-full w-full">
                  {hotspots.map((hotspot) => (
                    <Hotspot key={hotspot.id} {...hotspot} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
