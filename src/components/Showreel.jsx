import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import CarouselRiveSlide from "./CarouselRiveSlide";
import "./Showreel.css";

gsap.registerPlugin(Draggable);

export default function Showreel() {
  const wrapperRef = useRef(null);
  const slideRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = useRef(0);
  const dragInstance = useRef(null);
  const [animations, setAnimations] = useState([]);

  // Fetch animations from backend + decode blobs
  useEffect(() => {
    fetch("http://localhost/gsapclone/get_animations.php")
      .then((res) => res.json())
      .then((data) => {
        const animationsWithBlob = data.map((animation) => {
          // Decode Rive file
          const byteCharacters = atob(animation.rive_file);
          const byteNumbers = Array.from(byteCharacters, (c) =>
            c.charCodeAt(0)
          );
          const blob = new Blob([new Uint8Array(byteNumbers)], {
            type: "application/octet-stream",
          });
          const blobUrl = URL.createObjectURL(blob);

          return {
            ...animation,
            rive_blob_url: blobUrl,
            font_blob_url: animation.font_url || null,
            audio_url: animation.audio_url || null,
          };
        });

        setAnimations(animationsWithBlob);
      })
      .catch((err) => console.error("Error loading animations:", err));
  }, []);

  // Update slide positions and styles (dim + scale + zIndex)
  const updateSlides = (index) => {
    if (!slideRefs.current.length) return;

    const total = animations.length;
    const getOffset = (i) =>
      ((i - index + total) % total) - Math.floor(total / 2);
    slideRefs.current.forEach((slide, i) => {
      const offset = getOffset(i);
      const absOffset = Math.abs(offset);

      const scale = offset === 0 ? 1.1 : 0.9;

      // Set opacity based on distance:
      // Active slide: 1
      // Immediate neighbors: 0.5
      // Further away: 0 (fully hidden)
      let opacity;
      if (absOffset === 0) {
        opacity = 1;
      } else if (absOffset === 1) {
        opacity = 0.5;
      } else {
        opacity = 0;
      }

      const z = offset === 0 ? 10 : 1;

      gsap.to(slide, {
        x: offset * slideWidth.current,
        scale,
        opacity,
        zIndex: z,
        ease: "elastic.out(0.5, 0.4)",
        duration: 0.8,
      });
    });
  };

  useEffect(() => {
    if (slideRefs.current[0]) {
      slideWidth.current = slideRefs.current[0].offsetWidth * 1.1;
      updateSlides(currentIndex);
    }
  }, [currentIndex, animations]);

  useEffect(() => {
    const handleResize = () => {
      if (slideRefs.current[0]) {
        slideWidth.current = slideRefs.current[0].offsetWidth * 1.1;
        updateSlides(currentIndex);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, animations]);

  // Draggable logic for swiping carousel
  useEffect(() => {
    if (!wrapperRef.current || animations.length === 0) return;

    slideWidth.current = slideRefs.current[0].offsetWidth * 1.1;

    dragInstance.current = Draggable.create(wrapperRef.current, {
      type: "x",
      inertia: false,
      cursor: "grab",
      activeCursor: "grabbing",
      onPress() {
        this.startX = this.x;
        this.hasSnapped = false;
      },
      onDrag() {
        const dragOffset = this.x / slideWidth.current;

        if (!this.hasSnapped && Math.abs(this.x) > 10) {
          this.hasSnapped = true;
          const direction = this.x > 0 ? -1 : 1;
          const newIndex =
            (currentIndex + direction + animations.length) % animations.length;
          setCurrentIndex(newIndex);
          this.endDrag();
          gsap.set(wrapperRef.current, { x: 0 });
          return;
        }

        slideRefs.current.forEach((slide, i) => {
          const relativeIndex =
            ((i - currentIndex + animations.length) % animations.length) -
            Math.floor(animations.length / 2);
          const xOffset = (relativeIndex + dragOffset) * slideWidth.current;
          const distance = Math.abs(relativeIndex + dragOffset);
          const scale = gsap.utils.interpolate(1.1, 0.9, Math.min(distance, 1));
          const opacity = gsap.utils.interpolate(1, 0.5, Math.min(distance, 1)); // DIM inactive slides
          const z = distance < 0.5 ? 10 : 1;

          gsap.set(slide, {
            x: xOffset,
            scale,
            opacity,
            zIndex: z,
          });
        });
      },
      onRelease() {
        if (!this.hasSnapped) {
          gsap.to(wrapperRef.current, {
            x: 0,
            duration: 2,
            ease: "elastic.out(1, 0.5)",
          });
        }
      },
    })[0];

    return () => dragInstance.current?.kill();
  }, [currentIndex, animations]);

  const next = () => setCurrentIndex((i) => (i + 1) % animations.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + animations.length) % animations.length);

  return (
    <div className="showreel-container">
      <div className="draggable-wrapper" ref={wrapperRef}>
        <div className="carousel">
          {animations.length > 0 &&
            animations.map((animation, i) => (
              <div
                className="carousel-slide"
                key={animation.id || i}
                ref={(el) => (slideRefs.current[i] = el)}
              >
                <CarouselRiveSlide
                  src={animation.rive_blob_url}
                  fontSrc={animation.font_blob_url}
                  audioSrc={animation.audio_url}
                  isActive={i === currentIndex}
                  stateMachineName={animation.state_machine}
                />
              </div>
            ))}
        </div>
      </div>

      {animations.length > 1 && (
        <div className="nav-arrows">
          <button onClick={prev}>&larr;</button>
          <button onClick={next}>&rarr;</button>
        </div>
      )}
    </div>
  );
}
