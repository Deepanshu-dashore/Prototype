

"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

// 8 Verified Distributor Hubs Metadata
const DISTRIBUTORS = [
  {
    id: "ireland-hq",
    company: "CCMatting (HQ / Regional)",
    city: "Dublin & London",
    country: "Ireland & UK",
    coords: [53.3498, -6.2603],
  },
  {
    id: "germany",
    company: "IAB Reinraum-Produkte GmbH",
    city: "Braunschweig",
    country: "Germany",
    coords: [52.2689, 10.5268],
  },
  {
    id: "usa",
    company: "Acumen Technology",
    city: "Blaine, Minnesota",
    country: "United States",
    coords: [45.1608, -93.2349],
  },
  {
    id: "malaysia",
    company: "Sinar Global Hygiene",
    city: "Kuala Lumpur",
    country: "Malaysia",
    coords: [3.1390, 101.6869],
  },
  {
    id: "india",
    company: "Aptaclean Solutions Pvt. Ltd.",
    city: "Nagpur, Maharashtra",
    country: "India",
    coords: [21.1458, 79.0882],
  },
  {
    id: "south-africa",
    company: "Clerity",
    city: "Johannesburg",
    country: "South Africa",
    coords: [-26.2041, 28.0473],
  },
  {
    id: "czech-republic",
    company: "Ermin Ltd.",
    city: "Prague",
    country: "Czech Republic",
    coords: [50.0755, 14.4378],
  },
  {
    id: "spain",
    company: "CleanHub+",
    city: "Barcelona",
    country: "Spain",
    coords: [41.4036, 2.0175],
  },
];

const DISTRIBUTOR_MARKERS = DISTRIBUTORS.map((d) => ({
  location: d.coords,
  size: 0.075,
  id: d.id,
}));

const DISTRIBUTOR_ARCS = [
  { from: [53.3498, -6.2603], to: [51.5074, -0.1278] },
  { from: [53.3498, -6.2603], to: [52.2689, 10.5268] },
  { from: [53.3498, -6.2603], to: [50.0755, 14.4378] },
  { from: [53.3498, -6.2603], to: [41.4036, 2.0175] },
  { from: [53.3498, -6.2603], to: [45.1608, -93.2349] },
  { from: [53.3498, -6.2603], to: [21.1458, 79.0882] },
  { from: [21.1458, 79.0882], to: [3.1390, 101.6869] },
  { from: [53.3498, -6.2603], to: [-26.2041, 28.0473] },
];

export function ActiveDistributorCard({ activeIndex = 0, onSelect }) {
  const activeHub = DISTRIBUTORS[activeIndex] || DISTRIBUTORS[0];

  return (
    <div className="flex items-center gap-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md px-5 py-3.5 shadow-lg text-white transition-all duration-500 w-[300px] sm:w-[320px] shrink-0">
      <div className="relative flex h-3 w-3 items-center justify-center shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
      </div>

      <div className="flex flex-col text-left min-w-0 flex-1">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-cyan-200 truncate block">
            {activeHub.country}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-semibold text-white truncate block w-full">
          {activeHub.company}
        </span>
      </div>
    </div>
  );
}

export default function RotatingGlobe({ activeIndex: propIndex, onActiveChange }) {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(4.7);

  const [localIndex, setLocalIndex] = useState(propIndex !== undefined ? propIndex : 4);
  const activeIndex = propIndex !== undefined ? propIndex : localIndex;

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % DISTRIBUTORS.length;
      if (propIndex === undefined) setLocalIndex(next);
      if (onActiveChange) onActiveChange(next);
    }, 3500);
    return () => clearInterval(timer);
  }, [activeIndex, propIndex, onActiveChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = canvas.parentElement ? canvas.parentElement.offsetWidth : 500;
    let animFrameId = null;
    let globe = null;

    const onResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.parentElement.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);

    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width * 2,
        height: width * 2,
        phi: 4.7,
        theta: 0.25,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.1, 0.4, 0.85],
        glowColor: [1, 1, 1],
        markers: DISTRIBUTOR_MARKERS,
        arcs: DISTRIBUTOR_ARCS,
        arcColor: [0.12, 0.45, 0.88],
        arcWidth: 0.6,
        arcHeight: 0.3,
      });

      const animate = () => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        if (globe) {
          globe.update({
            phi: phiRef.current + pointerInteractionMovement.current,
            width: width * 2,
            height: width * 2,
          });
        }
        animFrameId = requestAnimationFrame(animate);
      };

      animFrameId = requestAnimationFrame(animate);

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 50);
    } catch (err) {
      console.error("Error creating Cobe globe:", err);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (globe) globe.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full min-h-[380px] overflow-visible select-none">
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.008;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.008;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "500px",
          maxHeight: "500px",
          aspectRatio: "1",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 0.5s ease",
          cursor: "grab",
        }}
      />
    </div>
  );
}

export { RotatingGlobe as CobeGlobe, DISTRIBUTORS };





