"use client";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import imgSource from "@public/images/image1.png";

const points = [
  { id: 1, x: "30%", y: "40%" },
  { id: 2, x: "60%", y: "70%" },
];

export default function ImageWithPoints() {
  return (
    <div className="relative h-screen w-screen bg-gray-900">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        limitToBounds={false}
        centerOnInit={false}
        alignmentAnimation={{ disabled: true }}
        centerZoomedOut={false}
        doubleClick={{ disabled: true }}
      >
        <TransformComponent
          wrapperClass="!w-full !h-full"
          contentClass="!w-full !h-full"
        >
          <div className="relative h-full w-full">
            <Image
              src={imgSource}
              alt="Interactive"
              fill
              className="min-h-[100vh] min-w-[100vw] object-cover"
              sizes="100vw"
              priority
            />

            {points.map((point) => (
              <div
                key={point.id}
                style={{
                  left: point.x,
                  top: point.y,
                  transform: "translate(-50%, -50%)",
                }}
                className="absolute flex items-center justify-center"
              >
                <div className="h-5 w-5 animate-ping rounded-full bg-white opacity-75" />
                <div className="absolute h-2 w-2 rounded-full bg-red-500" />
              </div>
            ))}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
