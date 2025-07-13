import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import CarouselRiveSlide from "./CarouselRiveSlide";
import "./Showreel.css";

gsap.registerPlugin(Draggable);

const riveSlides = [
  "/coin.riv",
  "/mascot.riv",
  "/icons.riv",
  "/boume.riv",
  "/coin.riv",
  "/icons.riv",
  "/mascot.riv",
  "/boume.riv",
];

// Map each rive file to its state machine name
const stateMachineMap = {
  "/coin.riv": "Main SM",
  "/mascot.riv": "Main SM",
  "/icons.riv": "Main SM",
  "/boume.riv": "Main SM",
};

export default function Showreel() {
  const wrapperRef = useRef(null);
  const slideRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideWidth = useRef(0);
  const dragInstance = useRef(null);

  const updateSlides = (index) => {
    const total = riveSlides.length;
    const getOffset = (i) =>
      ((i - index + total) % total) - Math.floor(total / 2);

    slideRefs.current.forEach((slide, i) => {
      const offset = getOffset(i);
      const scale = offset === 0 ? 1.1 : 0.9;
      const opacity = offset === 0 ? 1 : 0.5;
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
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (slideRefs.current[0]) {
        slideWidth.current = slideRefs.current[0].offsetWidth * 1.1;
        updateSlides(currentIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !slideRefs.current[0]) return;

    slideWidth.current = slideRefs.current[0].offsetWidth * 1.1;

    dragInstance.current = Draggable.create(wrapper, {
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
            (currentIndex + direction + riveSlides.length) % riveSlides.length;
          setCurrentIndex(newIndex);
          this.endDrag();
          gsap.set(wrapper, { x: 0 });
          return;
        }

        slideRefs.current.forEach((slide, i) => {
          const relativeIndex =
            ((i - currentIndex + riveSlides.length) % riveSlides.length) -
            Math.floor(riveSlides.length / 2);
          const xOffset = (relativeIndex + dragOffset) * slideWidth.current;
          const distance = Math.abs(relativeIndex + dragOffset);
          const scale = gsap.utils.interpolate(1.1, 0.9, Math.min(distance, 1));
          const opacity = gsap.utils.interpolate(1, 0.5, Math.min(distance, 1));
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
          gsap.to(wrapper, {
            x: 0,
            duration: 2,
            ease: "elastic.out(1, 0.5)",
          });
        }
      },
    })[0];

    return () => dragInstance.current?.kill();
  }, [currentIndex]);

  const next = () => setCurrentIndex((i) => (i + 1) % riveSlides.length);
  const prev = () =>
    setCurrentIndex((i) => (i - 1 + riveSlides.length) % riveSlides.length);

  return (
    <div className="showreel-container">
      <div className="draggable-wrapper" ref={wrapperRef}>
        <div className="carousel">
          {riveSlides.map((src, i) => (
            <div
              className="carousel-slide"
              key={i}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <CarouselRiveSlide
                src={src}
                isActive={i === currentIndex}
                stateMachineName={stateMachineMap[src]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="nav-arrows">
        <button onClick={prev}>&larr;</button>
        <button onClick={next}>&rarr;</button>
      </div>
    </div>
  );
}
