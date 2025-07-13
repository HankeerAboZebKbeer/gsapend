import React from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-webgl2";
import "./TileGrid.css";

const items = Array(12).fill({
  title: "Gabriel Veres",
  tags: ["ScrollTrigger", "SplitText"],
  src: "/coin.riv",
});

function TileRive({ src }) {
  const { RiveComponent, rive } = useRive({
    src,
    autoplay: false,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const handleMouseEnter = () => {
    if (rive) rive.play();
  };

  const handleMouseLeave = () => {
    if (rive) rive.pause();
  };

  return (
    <div
      className="tile-box"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RiveComponent className="tile__img" />
    </div>
  );
}

export default function TileGrid() {
  return (
    <section className="tile-grid">
      {items.map((item, idx) => (
        <div className="tile" key={idx}>
          <TileRive src={item.src} />
          <div className="tile__info">
            <h3>{item.title}</h3>
            <p>{`{ ${item.tags.join(", ")} }`}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
