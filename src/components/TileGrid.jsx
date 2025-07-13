import React, { useEffect, useState } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-webgl2";
import "./TileGrid.css";

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
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost/gsapclone/get_grid.php")
      .then((res) => res.json())
      .then((data) => {
        const processedItems = data.map((item) => {
          // Decode base64 .riv file to a Blob URL
          const byteCharacters = atob(item.rive_file);
          const byteNumbers = Array.from(byteCharacters, (c) =>
            c.charCodeAt(0)
          );
          const blob = new Blob([new Uint8Array(byteNumbers)], {
            type: "application/octet-stream",
          });
          const blobUrl = URL.createObjectURL(blob);

          return {
            ...item,
            rive_blob_url: blobUrl,
            font_blob_url: item.font_file || null,
            audio_url: item.audio_file || null,
          };
        });
        setItems(processedItems);
      })
      .catch((err) => {
        console.error("Error fetching grid items:", err);
        setItems([]);
      });
  }, []);

  return (
    <section className="tile-grid">
      {items.map((item, idx) => (
        <div className="tile" key={item.id || idx}>
          <TileRive src={item.rive_blob_url} />
          <div className="tile__info">
            <h3>{item.title || "Untitled"}</h3>
            {/* Tags optional: hide if not present */}
            {item.tags ? (
              <p>{`{ ${item.tags.join(", ")} }`}</p>
            ) : (
              <p style={{ opacity: 0.6 }}>{`{ no tags }`}</p>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
