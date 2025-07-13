import React, { useState } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-webgl2";
import ToolsDropdown from "./ToolsDropdown";
import "./Navbar.css";

function Navbar() {
  const [hoveringTools, setHoveringTools] = useState(false);

  const { RiveComponent: LogoRive } = useRive({
    src: "coin.riv",
    stateMachines: "Main SM",
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoplay: true,
  });

  const { RiveComponent: MenuRive } = useRive({
    src: "icons.riv",
    stateMachines: "Main SM",
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    autoplay: true,
  });

  const { RiveComponent: Menu2Rive } = useRive({
    src: "coin.riv",
    stateMachines: "Main SM",
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    autoplay: true,
  });

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">
          <LogoRive />
        </div>

        <div className="navbar__links">
          <a href="/" className="navbar__link">
            Home
          </a>

          <div
            className="navbar__tools-wrapper"
            onMouseEnter={() => setHoveringTools(true)}
            onMouseLeave={() => setHoveringTools(false)}
          >
            <span className="navbar__link navbar__link--tools">Tools</span>
            {hoveringTools && <ToolsDropdown />}
          </div>

          <a href="/core" className="navbar__link">
            Core
          </a>
          <a href="/plugins" className="navbar__link">
            Plugins
          </a>
          <a href="/showcase" className="navbar__link">
            Showcase
          </a>
          <a href="/learn" className="navbar__link">
            Learn
          </a>
          <a href="/community" className="navbar__link">
            Community
          </a>
          <a href="/forum" className="navbar__link">
            Forum
          </a>
        </div>

        <div className="navbar__menu-icon navbar__menu-icon--small">
          <MenuRive />
        </div>

        <div className="navbar__menu-icon navbar__menu-icon--large">
          <Menu2Rive />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
