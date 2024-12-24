"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/global/Loading-screen";
import Room from "@/components/room/Room";
import imgSource from "@public/images/image2.png";
import imgSource2 from "@public/images/image1.png";
import { ImageHotspot1, ImageHotspot2 } from "@/constants";
import { useParams } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import RoomMobile from "@/components/room/RoomMobile";
import { InteractionProvider } from "@/context";
export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  const params = useParams();
  const [imageSource, setImageSource] = useState(imgSource);
  const [hotspotData, sethotspotData] = useState(ImageHotspot1);
  useEffect(() => {
    if (params.room === "1") {
      setImageSource(imgSource);
      sethotspotData(ImageHotspot1);
    } else if (params.room === "2") {
      setImageSource(imgSource2);
      sethotspotData(ImageHotspot2);
    }
  }, []);
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
              <RoomMobile hotspots={hotspotData} imgSource={imageSource} />
            </InteractionProvider>
          ) : (
            <Room hotspots={hotspotData} imgSource={imageSource} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
