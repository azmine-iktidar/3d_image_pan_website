"use client";
export const runtime = "edge";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/global/Loading-screen";
import Room from "@/components/room/Room";
import imgSourceCafe from "@public/images/cafe.jpg";
import imgSourceY2 from "@public/images/y2.jpg";
import imgSourceStudio1 from "@public/images/studio1.jpg";
import imgSourceStudio2 from "@public/images/studio2.jpg";
import imgSourceStudio3 from "@public/images/studio3.jpg";
import {
  ImageHotspotCafe,
  ImageHotspotY2,
  ImageHotspotStudio1,
  ImageHotspotStudio2,
  ImageHotspotStudio3,
} from "@/constants";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import RoomMobile from "@/components/room/RoomMobile";
import { InteractionProvider } from "@/context";
import { useWindowSize } from "@/hooks/window-resize";
export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  const currentSize = useWindowSize();

  useEffect(() => {
    const debounceReload = setTimeout(() => {
      if (currentSize[0] !== windowWidth || currentSize[1] !== windowHeight) {
        window.location.reload();
      }
    }, 300); // Debounce to avoid excessive reloads

    return () => clearTimeout(debounceReload);
  }, [currentSize, windowWidth, windowHeight]);

  const params = useParams();
  const [imgSource, setImageSource] = useState(imgSourceY2);
  const [hotspotData, sethotspotData] = useState(ImageHotspotY2);
  useEffect(() => {
    if (params.room === "hq") {
      setImageSource(imgSourceY2);
      sethotspotData(ImageHotspotY2);
    } else if (params.room === "studio1") {
      setImageSource(imgSourceStudio1);
      sethotspotData(ImageHotspotStudio1);
    } else if (params.room === "studio2") {
      setImageSource(imgSourceStudio2);
      sethotspotData(ImageHotspotStudio2);
    } else if (params.room === "studio3") {
      setImageSource(imgSourceStudio3);
      sethotspotData(ImageHotspotStudio3);
    } else if (params.room === "cafe") {
      setImageSource(imgSourceCafe);
      sethotspotData(ImageHotspotCafe);
    } else {
      setImageSource(imgSourceY2);
      sethotspotData(ImageHotspotY2);
    }
  }, [params.room]);
  return (
    <AnimatePresence mode="wait" onExitComplete={handleLoadingComplete}>
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingScreen
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {isMobile ? (
            <InteractionProvider>
              <RoomMobile hotspots={hotspotData} imgSource={imgSource} />
            </InteractionProvider>
          ) : (
            <Room hotspots={hotspotData} imgSource={imgSource} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
