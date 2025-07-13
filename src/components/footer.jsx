import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="gsap-footer">
      {/* Top Black Section */}
      <div className="footer-top">
        <div className="footer-category">
          <h4 className="green">GSAP</h4>
          <p>Core</p>
          <p>Docs</p>
          <p>All Plugins</p>
        </div>
        <div className="footer-category">
          <h4 className="purple">Scroll</h4>
          <p>ScrollTrigger</p>
          <p>ScrollSmoother</p>
          <p>ScrollTo</p>
        </div>
        <div className="footer-category">
          <h4 className="orange">SVG</h4>
          <p>DrawSVG</p>
          <p>MorphSVG</p>
          <p>MotionPath</p>
          <p>MotionPathHelper</p>
        </div>
        <div className="footer-category">
          <h4 className="blue">UI</h4>
          <p>Flip</p>
          <p>Draggable</p>
          <p>Inertia</p>
          <p>Observer</p>
        </div>
        <div className="footer-category">
          <h4 className="lavender">Text</h4>
          <p>SplitText</p>
          <p>ScrambleText</p>
          <p>Text Replace</p>
        </div>
        <div className="footer-category">
          <h4 className="green">Other</h4>
          <p>Physics2D</p>
          <p>PhysicsProps</p>
          <p>GSDevTools</p>
        </div>
      </div>

      {/* Bottom Yellow Section */}
      <div className="footer-bottom">
        <div className="newsletter">
          <h3>Keep in the loop with the GSAP® newsletter.</h3>
          <div className="newsletter-input">
            <input type="email" placeholder="Email Address" />
            <button>→</button>
          </div>
        </div>

        <div className="footer-links">
          <div>
            <h5>GSAP</h5>
            <p>Blog</p>
            <p>Showcase</p>
            <p>Learn GSAP</p>
            <p>GSAP & Webflow</p>
            <p>Contact Us</p>
          </div>
          <div>
            <h5>Connect</h5>
            <p>Forums</p>
            <p>Codepen</p>
            <p>LinkedIn</p>
            <p>Bluesky</p>
            <p>GitHub</p>
            <p>X</p>
          </div>
        </div>

        <div className="footer-note">
          <p>©2025 GSAP – A Webflow Product. All rights reserved.</p>
          <p className="footer-policy">Privacy Policy. Terms of Use.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
