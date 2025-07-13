import React, { useEffect } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  EventType,
} from "@rive-app/react-webgl2";

export default function CarouselRiveSlide({
  src,
  isActive,
  stateMachineName,
  fontSrc,
  audioSrc,
}) {
  const { RiveComponent, rive } = useRive({
    src,
    autoplay: true,
    paused: !isActive, // Pause inactive slides to avoid ghost animation
    stateMachines: stateMachineName,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    // You can add assetLoader here if you want font/audio handling
  });

  useEffect(() => {
    if (!rive) return;

    const onEvent = (event) => {
      // Optionally log events
      // console.log("Rive event:", event.data.name);
    };

    if (isActive) {
      rive.on(EventType.RiveEvent, onEvent);
    }

    return () => {
      rive?.off(EventType.RiveEvent, onEvent);
    };
  }, [rive, isActive]);

  return (
    <div
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      className="rive-wrapper"
    >
      <RiveComponent />
    </div>
  );
}
