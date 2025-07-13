import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Showcase from "../components/Showreel";
import TileGrid from "../components/TileGrid";
import Belt from "../components/belt"; // ✅ fixed uppercase name
import { initSmoothScroll } from "../smoothScroll";
import Footer from "../components/footer";
function Home() {
  useEffect(() => {
    initSmoothScroll();
  }, []);

  return (
    <div>
      <Navbar />
      <Showcase />
      <Belt /> {/* ✅ fixed JSX component name */}
      <TileGrid />
      <Footer />
    </div>
  );
}

export default Home;
