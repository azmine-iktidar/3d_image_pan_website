"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Link
            href={url}
            className={cn(
              "group z-20 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
              className,
            )}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
            }}
          >
            {/* Base hotspot dot */}
            <span className="relative block h-[11px] w-[11px]">
              {/* Inner dot */}
              <span className="absolute inset-0 block animate-pulse rounded-full bg-white shadow-[0_0_10px_5px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-110 group-hover:animate-none" />

              {/* Pinging circles */}
              <span className="absolute inset-0 block animate-ping rounded-full bg-white/30 group-hover:animate-none" />
              <span className="absolute -inset-1 block animate-ping rounded-full bg-white/20 [animation-delay:0.2s] group-hover:animate-none" />
              <span className="absolute -inset-2 block animate-ping rounded-full bg-white/10 [animation-delay:0.4s] group-hover:animate-none" />

              {/* Hover ring */}
              <span className="duration-400 absolute -inset-10 block rounded-full border border-white/20 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="rounded-full bg-white px-4 py-2 font-bold text-black"
          sideOffset={15}
        >
          <Link href={url}>{title}</Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
