"use client";
import { useEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize(); // Initialize size on mount

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
