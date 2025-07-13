import React from "react";
import "./ToolsDropdown.css";

function ToolsDropdown() {
  return (
    <div className="tools-dropdown">
      <div className="tools-dropdown__triangle"></div>
      <div className="tools-dropdown__content">
        <div className="tools-dropdown__column">
          <a href="/core">Core</a>
          <a href="/scroll">Scroll</a>
          <a href="/svg">SVG</a>
          <a href="/ui">UI</a>
          <a href="/text">Text</a>
        </div>
        <div className="tools-dropdown__column2">
          <a href="/install">Installation</a>
          <a href="/templates">Starter Templates</a>
          <a href="/gsap-react">GSAP & React</a>
          <a href="/videos">Video Lessons</a>
        </div>
        <div className="tools-dropdown__footer">
          <p>
            Professional-grade <br />
            JavaScript animation for the modern web.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ToolsDropdown;
