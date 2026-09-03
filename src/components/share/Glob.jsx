

// "use client";

// import React, { useEffect, useRef } from "react";
// import createGlobe from "cobe";

// const MARKERS = [
//   {
//     id: "sf",
//     location: [37.78, -122.44],
//   },
//   {
//     id: "nyc",
//     location: [40.71, -74.01],
//   },
//   {
//     id: "london",
//     location: [51.51, -0.13],
//   },
//   {
//     id: "tokyo",
//     location: [35.68, 139.65],
//   },
//   {
//     id: "india",
//     location: [28.61, 77.21],
//   },
//   {
//     id: "dubai",
//     location: [25.20, 55.27],
//   },
//   {
//     id: "singapore",
//     location: [1.35, 103.82],
//   },
//   {
//     id: "sydney",
//     location: [-33.87, 151.21],
//   },
// ];

// const ARCS = [
//   {
//     from: [37.78, -122.44],
//     to: [40.71, -74.01],
//   },
//   {
//     from: [40.71, -74.01],
//     to: [51.51, -0.13],
//   },
//   {
//     from: [51.51, -0.13],
//     to: [28.61, 77.21],
//   },
//   {
//     from: [28.61, 77.21],
//     to: [35.68, 139.65],
//   },
//   {
//     from: [28.61, 77.21],
//     to: [25.20, 55.27],
//   },
//   {
//     from: [25.20, 55.27],
//     to: [1.35, 103.82],
//   },
//   {
//     from: [1.35, 103.82],
//     to: [-33.87, 151.21],
//   },
//   {
//     from: [35.68, 139.65],
//     to: [37.78, -122.44],
//   },
// ];

// export default function RotatingGlobe() {
//   const canvasRef = useRef(null);
//   const globeRef = useRef(null);
//   const phiRef = useRef(0);

//   useEffect(() => {
//     const canvas = canvasRef.current;

//     if (!canvas) return;

//     const getSize = () => {
//       const parent = canvas.parentElement;

//       if (!parent) {
//         return 600;
//       }

//       const rect = parent.getBoundingClientRect();

//       return Math.max(
//         200,
//         Math.min(rect.width, rect.height)
//       );
//     };

//     const getDpr = () => {
//       return Math.min(
//         window.devicePixelRatio || 1,
//         2
//       );
//     };

//     const size = getSize();
//     const dpr = getDpr();

//     const globe = createGlobe(canvas, {
//       devicePixelRatio: dpr,

//       width: size * dpr,
//       height: size * dpr,

//       // Initial globe position
//       phi: phiRef.current,
//       theta: 0.2,

//       // Appearance
//       dark: 0,
//       diffuse: 1.2,

//       mapSamples: 16000,
//       mapBrightness: 6,

//       baseColor: [1, 1, 1],

//       markerColor: [0.2, 0.4, 1],

//       glowColor: [1, 1, 1],

//       // Markers
//       markers: MARKERS.map((marker) => ({
//         location: marker.location,
//         size: 0.03,
//         id: marker.id,
//       })),

//       // Connection arcs
//       arcs: ARCS,

//       arcColor: [0.3, 0.5, 1],

//       arcWidth: 0.5,

//       arcHeight: 0.3,

//       // Continuous rotation
//       onRender: (state) => {
//         state.phi = phiRef.current;

//         // Smooth continuous rotation
//         phiRef.current += 0.0035;
//       },
//     });

//     globeRef.current = globe;

//     // =====================================================
//     // RESIZE
//     // =====================================================

//     const handleResize = () => {
//       if (!globeRef.current) return;

//       const newSize = getSize();
//       const newDpr = getDpr();

//       globeRef.current.update({
//         width: newSize * newDpr,
//         height: newSize * newDpr,
//         devicePixelRatio: newDpr,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     // =====================================================
//     // RESIZE OBSERVER
//     // =====================================================

//     let resizeObserver = null;

//     if (
//       typeof ResizeObserver !== "undefined" &&
//       canvas.parentElement
//     ) {
//       resizeObserver = new ResizeObserver(() => {
//         handleResize();
//       });

//       resizeObserver.observe(canvas.parentElement);
//     }

//     // =====================================================
//     // CLEANUP
//     // =====================================================

//     return () => {
//       window.removeEventListener(
//         "resize",
//         handleResize
//       );

//       if (resizeObserver) {
//         resizeObserver.disconnect();
//       }

//       if (globeRef.current) {
//         globeRef.current.destroy();
//         globeRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",

//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",

//         overflow: "visible",

//         background: "transparent",
//       }}
//     >
//       <canvas
//         ref={canvasRef}
//         style={{
//           display: "block",

//           width: "100%",
//           height: "100%",

//           maxWidth: "100%",
//           maxHeight: "100%",

//           background: "transparent",

//           // Prevent unwanted selection/touch behavior
//           userSelect: "none",
//           WebkitUserSelect: "none",
//         }}
//       />
//     </div>
//   );
// }
"use client";

import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

const MARKERS = [
  {
    id: "sf",
    location: [37.78, -122.44],
  },
  {
    id: "nyc",
    location: [40.71, -74.01],
  },
  {
    id: "london",
    location: [51.51, -0.13],
  },
  {
    id: "tokyo",
    location: [35.68, 139.65],
  },
  {
    id: "india",
    location: [28.61, 77.21],
  },
  {
    id: "dubai",
    location: [25.20, 55.27],
  },
  {
    id: "singapore",
    location: [1.35, 103.82],
  },
  {
    id: "sydney",
    location: [-33.87, 151.21],
  },
];

const ARCS = [
  {
    from: [37.78, -122.44],
    to: [40.71, -74.01],
  },
  {
    from: [40.71, -74.01],
    to: [51.51, -0.13],
  },
  {
    from: [51.51, -0.13],
    to: [28.61, 77.21],
  },
  {
    from: [28.61, 77.21],
    to: [35.68, 139.65],
  },
  {
    from: [28.61, 77.21],
    to: [25.20, 55.27],
  },
  {
    from: [25.20, 55.27],
    to: [1.35, 103.82],
  },
  {
    from: [1.35, 103.82],
    to: [-33.87, 151.21],
  },
  {
    from: [35.68, 139.65],
    to: [37.78, -122.44],
  },
];

export default function RotatingGlobe() {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const getSize = () => {
      const parent = canvas.parentElement;

      if (!parent) {
        return 600;
      }

      const rect = parent.getBoundingClientRect();

      return Math.max(
        200,
        Math.min(rect.width, rect.height)
      );
    };

    const getDpr = () => {
      return Math.min(
        window.devicePixelRatio || 1,
        2
      );
    };

    const size = getSize();
    const dpr = getDpr();

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,

      width: size * dpr,
      height: size * dpr,

      // Initial globe position
      phi: phiRef.current,
      theta: 0.2,

      // Appearance
      dark: 0,
      diffuse: 1.2,

      mapSamples: 16000,
      mapBrightness: 6,

      baseColor: [1, 1, 1],

      markerColor: [0.2, 0.4, 1],

      glowColor: [1, 1, 1],

      // Markers
      markers: MARKERS.map((marker) => ({
        location: marker.location,
        size: 0.03,
        id: marker.id,
      })),

      // Connection arcs
      arcs: ARCS,

      arcColor: [0.3, 0.5, 1],

      arcWidth: 0.5,

      arcHeight: 0.3,
    });

    globeRef.current = globe;

    // =====================================================
    // AUTO-ROTATION LOOP
    // =====================================================

    let animationFrameId;

    const animate = () => {
      phiRef.current += 0.0035;
      if (globeRef.current) {
        globeRef.current.update({
          phi: phiRef.current,
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // =====================================================
    // RESIZE
    // =====================================================

    const handleResize = () => {
      if (!globeRef.current) return;

      const newSize = getSize();
      const newDpr = getDpr();

      globeRef.current.update({
        width: newSize * newDpr,
        height: newSize * newDpr,
        devicePixelRatio: newDpr,
      });
    };

    window.addEventListener("resize", handleResize);

    // =====================================================
    // RESIZE OBSERVER
    // =====================================================

    let resizeObserver = null;

    if (
      typeof ResizeObserver !== "undefined" &&
      canvas.parentElement
    ) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      resizeObserver.observe(canvas.parentElement);
    }

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (resizeObserver) {
        resizeObserver.disconnect();
      }

      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        overflow: "visible",

        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",

          width: "100%",
          height: "100%",

          maxWidth: "100%",
          maxHeight: "100%",

          background: "transparent",

          // Prevent unwanted selection/touch behavior
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      />
    </div>
  );
}