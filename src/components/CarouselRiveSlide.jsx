import React, { useEffect } from "react";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  decodeFont,
  EventType,
} from "@rive-app/react-webgl2";

const loadAllAssets = async (asset) => {
  if (asset.isFont) {
    const fontUrl = "/fonts/Inter-594377.ttf";
    const res = await fetch(fontUrl);
    const fontBuffer = await res.arrayBuffer();
    const font = await decodeFont(new Uint8Array(fontBuffer));
    asset.setFont(font);
    font.unref();
    return true;
  }
  return false;
};

export default function CarouselRiveSlide({ src, isActive }) {
  const { RiveComponent, rive } = useRive({
    src,
    autoplay: true,
    paused: !isActive,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    assetLoader: loadAllAssets,
  });

  useEffect(() => {
    if (!rive) return;

    const onEvent = (event) => {
      console.log("Rive event:", event.data.name);
    };

    if (isActive) {
      rive.on(EventType.RiveEvent, onEvent);
    }

    return () => {
      rive?.off(EventType.RiveEvent, onEvent);
    };
  }, [rive, isActive]);

  return (
    <div style={{ width: "100%", height: "100%", pointerEvents: "none" }}>
      <RiveComponent />
    </div>
  );
}
