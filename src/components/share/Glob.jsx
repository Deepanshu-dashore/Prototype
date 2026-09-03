// import React, { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// // Clean, high-performance dotted globe matching corporate tech themes
// function DottedGlobe() {
//   const globeRef = useRef();

//   useFrame((state, delta) => {
//     if (globeRef.current) {
//       globeRef.current.rotation.y += delta * 0.12;
//     }
//   });

//   const { points, nodes } = useMemo(() => {
//     const pts = [];
//     const specialNodes = [];
//     const radius = 2;
//     const detail = 50;

//     for (let lat = -90; lat <= 90; lat += 180 / detail) {
//       const phi = (lat * Math.PI) / 180;
//       if (Math.abs(lat) > 85) continue;

//       for (let lon = -180; lon <= 180; lon += 360 / detail) {
//         const theta = (lon * Math.PI) / 180;
        
//         // Balanced distribution for clean corporate look
//         const x = radius * Math.cos(phi) * Math.cos(theta);
//         const y = radius * Math.sin(phi);
//         const z = radius * Math.cos(phi) * Math.sin(theta);

//         const vector = new THREE.Vector3(x, y, z);
//         pts.push(vector);

//         // Highlight nodes
//         if (Math.random() < 0.03) {
//           specialNodes.push(vector);
//         }
//       }
//     }
//     return {
//       points: new THREE.BufferGeometry().setFromPoints(pts),
//       nodes: specialNodes,
//     };
//   }, []);

//   return (
//     <group ref={globeRef}>
//       {/* Globe Dot Matrix */}
//       <points geometry={points}>
//         <pointsMaterial
//           size={0.035}
//           color="#ffffff" // Clean white dots for crisp contrast on blue
//           transparent
//           opacity={0.85}
//           sizeAttenuation
//         />
//       </points>

//       {/* Distribution Hub Nodes */}
//       {nodes.map((pos, idx) => (
//         <mesh key={idx} position={pos}>

//           <meshBasicMaterial color="#93c5fd" />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// // Sleek orbital arcs floating around the globe
// function OrbitalArcs() {
//   const arcsRef = useRef();

//   useFrame((state, delta) => {
//     if (arcsRef.current) {
//       arcsRef.current.rotation.y -= delta * 0.08;
//     }
//   });

//   const curves = useMemo(() => {
//     const curvePoints = [
//       [new THREE.Vector3(-1.8, -0.5, 1.2), new THREE.Vector3(-0.2, 2.5, 0), new THREE.Vector3(1.6, -1.2, -1)],
//       [new THREE.Vector3(-1.2, -1.5, -1.2), new THREE.Vector3(0.5, 2.4, 0.8), new THREE.Vector3(1.8, 0.2, 1.2)],
//     ];

//     return curvePoints.map((pts) => {
//       const curve = new THREE.QuadraticBezierCurve3(pts[0], pts[1], pts[2]);
//       return curve.getPoints(60);
//     });
//   }, []);

//   return (
//     <group ref={arcsRef}>
//       {curves.map((points, index) => {
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);
//         return (
//           <line key={index} geometry={geometry}>
//             <lineBasicMaterial color="#93c5fd" transparent opacity={0.5} linewidth={1.5} />
//           </line>
//         );
//       })}
//     </group>
//   );
// }

// // Main Component with transparent container layout
// export default function InteractiveGlobe() {
//   return (
//     <div className="w-full h-[420px] relative flex items-center justify-center bg-transparent pointer-events-auto">
//       <Canvas
//         camera={{ position: [0, 0, 4.8], fov: 45 }}
//         style={{ background: 'transparent' }}
//         gl={{ alpha: true }}
//       >
//         <ambientLight intensity={1.2} />
//         <DottedGlobe />
//         {/* <OrbitalArcs /> */}
//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           autoRotate={false}
//           rotateSpeed={0.6}
//           minPolarAngle={Math.PI / 3}
//           maxPolarAngle={Math.PI / 1.5}
//         />
//       </Canvas>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

/* =========================================================
   REFERENCE DIMENSIONS

   Original reference:
   336 x 358 px

   Globe:
   ~328 px diameter
   centered around x = 168
   centered around y = 178
========================================================= */

const REF_WIDTH = 336;
const REF_HEIGHT = 358;

const GLOBE_RADIUS = 1;

/* =========================================================
   COLORS
========================================================= */

const COLORS = {
  backgroundTop: "#164d75",
  backgroundMiddle: "#092f52",
  backgroundBottom: "#061c3b",

  ocean: "#062d4e",

  land: "#075f98",
  landLight: "#0879b4",

  countryBorder: "#209edc",

  grid: "#2389be",
  gridLight: "#32bce9",

  node: "#54dcff",
  nodeBright: "#b5f7ff",

  atmosphere: "#159edb",
};

/* =========================================================
   WORLD DATA
========================================================= */

const WORLD = feature(
  worldData,
  worldData.objects.countries
).features;

/* =========================================================
   CONVERT LAT/LON TO SPHERE POSITION

   Important:
   This orientation is intentionally selected to put:
   North America -> left
   Europe/Africa -> right
   South America -> lower center
========================================================= */

function latLonToVector(lat, lon, radius = 1) {
  const phi = THREE.MathUtils.degToRad(lat);
  const theta = THREE.MathUtils.degToRad(lon);

  const x =
    radius *
    Math.cos(phi) *
    Math.sin(theta);

  const y =
    radius *
    Math.sin(phi);

  const z =
    radius *
    Math.cos(phi) *
    Math.cos(theta);

  return new THREE.Vector3(x, y, z);
}

/* =========================================================
   COUNTRY POLYGON

   Draws the flat blue continents manually so the appearance
   is closer to the reference.
========================================================= */

function CountryPolygons({ countries }) {
  const groupRef = useRef();

  const countryMeshes = useMemo(() => {
    const result = [];

    countries.forEach((country, countryIndex) => {
      const geometry = country.geometry;

      if (!geometry) return;

      const polygons =
        geometry.type === "Polygon"
          ? [geometry.coordinates]
          : geometry.type === "MultiPolygon"
            ? geometry.coordinates
            : [];

      polygons.forEach(
        (polygon, polygonIndex) => {
          if (!polygon || !polygon[0]) return;

          const outerRing =
            polygon[0];

          if (outerRing.length < 3) return;

          const points = [];

          outerRing.forEach(
            ([lon, lat]) => {
              points.push(
                latLonToVector(
                  lat,
                  lon,
                  1.008
                )
              );
            }
          );

          if (points.length < 3) return;

          /*
             Create filled shape by projecting the
             polygon onto a local plane.

             For this stylized globe the easiest
             stable representation is a thin
             triangulated polygon.
          */

          const positions = [];

          for (
            let i = 1;
            i < points.length - 1;
            i++
          ) {
            const p0 = points[0];
            const p1 = points[i];
            const p2 = points[i + 1];

            positions.push(
              p0.x,
              p0.y,
              p0.z,

              p1.x,
              p1.y,
              p1.z,

              p2.x,
              p2.y,
              p2.z
            );
          }

          const fillGeometry =
            new THREE.BufferGeometry();

          fillGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
              positions,
              3
            )
          );

          fillGeometry.computeVertexNormals();

          /* -----------------------------
             COUNTRY BORDER
          ----------------------------- */

          const borderPositions = [];

          for (
            let i = 0;
            i < points.length;
            i++
          ) {
            const current =
              points[i];

            const next =
              points[
                (i + 1) %
                  points.length
              ];

            borderPositions.push(
              current.x,
              current.y,
              current.z,

              next.x,
              next.y,
              next.z
            );
          }

          const borderGeometry =
            new THREE.BufferGeometry();

          borderGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(
              borderPositions,
              3
            )
          );

          result.push({
            fillGeometry,
            borderGeometry,
            key: `${countryIndex}-${polygonIndex}`,
          });
        }
      );
    });

    return result;
  }, [countries]);

  return (
    <group ref={groupRef}>
      {countryMeshes.map(
        ({
          fillGeometry,
          borderGeometry,
          key,
        }) => (
          <group key={key}>
            {/* ==============================
                COUNTRY FILL
            ============================== */}

            <mesh
              geometry={fillGeometry}
            >
              <meshBasicMaterial
                color={
                  COLORS.land
                }
                transparent
                opacity={0.88}
                side={
                  THREE.DoubleSide
                }
                depthWrite={false}
              />
            </mesh>

            {/* ==============================
                COUNTRY OUTLINE
            ============================== */}

            <lineSegments
              geometry={
                borderGeometry
              }
            >
              <lineBasicMaterial
                color={
                  COLORS.countryBorder
                }
                transparent
                opacity={0.72}
              />
            </lineSegments>
          </group>
        )
      )}
    </group>
  );
}

/* =========================================================
   SPHERICAL GRID

   Reference has very thin longitude / latitude lines.
========================================================= */

function GlobeGrid() {
  const geometry = useMemo(() => {
    const positions = [];

    const radius = 1.012;

    /* -----------------------------
       LATITUDE
    ----------------------------- */

    for (
      let lat = -75;
      lat <= 75;
      lat += 15
    ) {
      for (
        let lon = -180;
        lon < 180;
        lon += 2
      ) {
        const p1 =
          latLonToVector(
            lat,
            lon,
            radius
          );

        const p2 =
          latLonToVector(
            lat,
            lon + 2,
            radius
          );

        positions.push(
          p1.x,
          p1.y,
          p1.z,

          p2.x,
          p2.y,
          p2.z
        );
      }
    }

    /* -----------------------------
       LONGITUDE
    ----------------------------- */

    for (
      let lon = -180;
      lon < 180;
      lon += 15
    ) {
      for (
        let lat = -88;
        lat < 88;
        lat += 2
      ) {
        const p1 =
          latLonToVector(
            lat,
            lon,
            radius
          );

        const p2 =
          latLonToVector(
            lat + 2,
            lon,
            radius
          );

        positions.push(
          p1.x,
          p1.y,
          p1.z,

          p2.x,
          p2.y,
          p2.z
        );
      }
    }

    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        positions,
        3
      )
    );

    return geo;
  }, []);

  return (
    <lineSegments
      geometry={geometry}
    >
      <lineBasicMaterial
        color={COLORS.grid}
        transparent
        opacity={0.34}
        depthWrite={false}
      />
    </lineSegments>
  );
}

/* =========================================================
   NETWORK NODES

   The reference has many very small cyan points.
   They must NOT become big dots.
========================================================= */

function Network() {
  const groupRef = useRef();

  const nodes = useMemo(() => {
    const result = [];

    const count = 310;

    /*
       Fibonacci sphere gives a much more natural
       distribution than a square lat/lon point grid.
    */

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const y =
        1 -
        (i /
          (count - 1)) *
          2;

      const radius =
        Math.sqrt(
          Math.max(
            0,
            1 - y * y
          )
        );

      const theta =
        Math.PI *
        (3 -
          Math.sqrt(5)) *
        i;

      const x =
        Math.cos(theta) *
        radius;

      const z =
        Math.sin(theta) *
        radius;

      result.push(
        new THREE.Vector3(
          x * 1.018,
          y * 1.018,
          z * 1.018
        )
      );
    }

    return result;
  }, []);

  /* =======================================================
     CREATE CONNECTIONS
  ======================================================= */

  const connectionGeometry =
    useMemo(() => {
      const positions = [];

      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {
        const source =
          nodes[i];

        let best = null;
        let bestDistance =
          Infinity;

        /*
           Only connect some nodes.
           This creates the reference's sparse
           technological mesh.
        */

        for (
          let j = 0;
          j < nodes.length;
          j++
        ) {
          if (i === j) continue;

          const target =
            nodes[j];

          const distance =
            source.distanceTo(
              target
            );

          if (
            distance > 0.11 &&
            distance < 0.31 &&
            distance <
              bestDistance
          ) {
            best =
              target;

            bestDistance =
              distance;
          }
        }

        if (
          best &&
          i % 2 === 0
        ) {
          positions.push(
            source.x,
            source.y,
            source.z,

            best.x,
            best.y,
            best.z
          );
        }
      }

      const geo =
        new THREE.BufferGeometry();

      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          positions,
          3
        )
      );

      return geo;
    }, [nodes]);

  /* =======================================================
     NODE GEOMETRY
  ======================================================= */

  const nodeGeometry =
    useMemo(() => {
      const positions = [];

      nodes.forEach(
        (node) => {
          positions.push(
            node.x,
            node.y,
            node.z
          );
        }
      );

      const geo =
        new THREE.BufferGeometry();

      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          positions,
          3
        )
      );

      return geo;
    }, [nodes]);

  /* =======================================================
     ROTATION
  ======================================================= */

  useFrame(
    (_, delta) => {
      if (
        groupRef.current
      ) {
        groupRef.current.rotation.y +=
          delta * 0.075;
      }
    }
  );

  return (
    <group ref={groupRef}>
      {/* -----------------------------------------------
          NETWORK LINES
      ----------------------------------------------- */}

      <lineSegments
        geometry={
          connectionGeometry
        }
      >
        <lineBasicMaterial
          color={
            COLORS.gridLight
          }
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </lineSegments>

      {/* -----------------------------------------------
          VERY SMALL DOTS
      ----------------------------------------------- */}

      <points
        geometry={
          nodeGeometry
        }
      >
        <pointsMaterial
          color={COLORS.node}
          size={0.011}
          sizeAttenuation
          transparent
          opacity={0.78}
          depthWrite={false}
          blending={
            THREE.AdditiveBlending
          }
        />
      </points>

      {/* -----------------------------------------------
          BRIGHT NODES
      ----------------------------------------------- */}

      {nodes
        .filter(
          (_, index) =>
            index % 29 ===
            0
        )
        .map(
          (
            position,
            index
          ) => (
            <mesh
              key={
                `bright-node-${index}`
              }
              position={
                position
              }
            >
              <sphereGeometry
                args={[
                  0.018,
                  8,
                  8,
                ]}
              />

              <meshBasicMaterial
                color={
                  COLORS.nodeBright
                }
              />
            </mesh>
          )
        )}
    </group>
  );
}

/* =========================================================
   OUTER ORBITAL LINES
========================================================= */

function OrbitalLines() {
  const ref =
    useRef();

  const orbitalData =
    useMemo(() => {
      return [
        {
          scaleX: 1.04,
          scaleY: 0.38,
          rotation: [
            THREE.MathUtils.degToRad(
              68
            ),
            0,
            THREE.MathUtils.degToRad(
              17
            ),
          ],
          opacity: 0.44,
        },

        {
          scaleX: 1.045,
          scaleY: 0.51,
          rotation: [
            THREE.MathUtils.degToRad(
              112
            ),
            THREE.MathUtils.degToRad(
              20
            ),
            THREE.MathUtils.degToRad(
              -15
            ),
          ],
          opacity: 0.25,
        },

        {
          scaleX: 1.035,
          scaleY: 0.64,
          rotation: [
            THREE.MathUtils.degToRad(
              83
            ),
            THREE.MathUtils.degToRad(
              -15
            ),
            THREE.MathUtils.degToRad(
              12
            ),
          ],
          opacity: 0.2,
        },
      ];
    }, []);

  useFrame(
    (_, delta) => {
      if (ref.current) {
        ref.current.rotation.y -=
          delta * 0.018;
      }
    }
  );

  return (
    <group ref={ref}>
      {orbitalData.map(
        (
          orbital,
          index
        ) => {
          const curve =
            new THREE.EllipseCurve(
              0,
              0,
              orbital.scaleX,
              orbital.scaleY,
              0,
              Math.PI * 2,
              false,
              0
            );

          const points =
            curve.getPoints(
              180
            );

          const geometry =
            new THREE.BufferGeometry().setFromPoints(
              points.map(
                (point) =>
                  new THREE.Vector3(
                    point.x,
                    point.y,
                    0
                  )
              )
            );

          return (
            <line
              key={
                `orbital-${index}`
              }
              geometry={
                geometry
              }
              rotation={
                orbital.rotation
              }
            >
              <lineBasicMaterial
                color={
                  COLORS.gridLight
                }
                transparent
                opacity={
                  orbital.opacity
                }
                depthWrite={
                  false
                }
              />
            </line>
          );
        }
      )}
    </group>
  );
}

/* =========================================================
   ATMOSPHERE
========================================================= */

function Atmosphere() {
  return (
    <>
      {/* ---------------------------------------------------
          OUTER GLOW
      --------------------------------------------------- */}

      <mesh scale={1.045}>
        <sphereGeometry
          args={[
            1,
            64,
            64,
          ]}
        />

        <meshBasicMaterial
          color={
            COLORS.atmosphere
          }
          transparent
          opacity={0.075}
          side={
            THREE.BackSide
          }
          blending={
            THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </mesh>

      {/* ---------------------------------------------------
          FINE OUTER WIRE SPHERE
      --------------------------------------------------- */}

      <mesh scale={1.025}>
        <sphereGeometry
          args={[
            1,
            64,
            64,
          ]}
        />

        <meshBasicMaterial
          color={
            COLORS.gridLight
          }
          transparent
          opacity={0.055}
          wireframe
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

/* =========================================================
   MAIN GLOBE
========================================================= */

function Globe() {
  const globeRef =
    useRef();

  const [countries, setCountries] =
    useState([]);

  useEffect(() => {
    setCountries(WORLD);
  }, []);

  /* -------------------------------------------------------
     ROTATION

     Slow enough to look like the reference.
  ------------------------------------------------------- */

  useFrame(
    (_, delta) => {
      if (
        globeRef.current
      ) {
        globeRef.current.rotation.y +=
          delta * 0.055;
      }
    }
  );

  return (
    <group
      ref={globeRef}
      rotation={[
        THREE.MathUtils.degToRad(
          2
        ),

        /*
           Initial horizontal orientation.
           This places America left and Europe/Africa right.
        */

        THREE.MathUtils.degToRad(
          -22
        ),

        0,
      ]}
    >
      {/* ===================================================
          EARTH BASE
      =================================================== */}

      <mesh>
        <sphereGeometry
          args={[
            GLOBE_RADIUS,
            96,
            96,
          ]}
        />

        <meshPhongMaterial
          color={
            COLORS.ocean
          }
          shininess={12}
          specular={
            new THREE.Color(
              "#0b5479"
            )
          }
        />
      </mesh>

      {/* ===================================================
          COUNTRIES
      =================================================== */}

      {countries.length >
        0 && (
        <CountryPolygons
          countries={
            countries
          }
        />
      )}

      {/* ===================================================
          GRID
      =================================================== */}

      <GlobeGrid />

      {/* ===================================================
          NETWORK
      =================================================== */}

      <Network />

      {/* ===================================================
          ORBITAL LINES
      =================================================== */}

      <OrbitalLines />

      {/* ===================================================
          ATMOSPHERE
      =================================================== */}

      <Atmosphere />
    </group>
  );
}

/* =========================================================
   BACKGROUND

   The reference is NOT transparent.

   It has a dark blue gradient:
   brighter around top/upper-right,
   darker toward bottom.
========================================================= */

function Background() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
      style={{
        background: `
          radial-gradient(
            circle at 58% 15%,
            rgba(34, 133, 177, 0.92) 0%,
            rgba(20, 91, 130, 0.82) 23%,
            rgba(8, 48, 78, 0.96) 52%,
            rgba(5, 28, 57, 1) 100%
          )
        `,
      }}
    />
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function InteractiveGlobe() {
  return (
    <div
      className="
        relative
        flex
        items-center
        justify-center
        overflow-hidden
        w-full
        h-[358px]
      "
      style={{
        /*
           Reference ratio:
           336 / 358
        */

        aspectRatio: `${REF_WIDTH} / ${REF_HEIGHT}`,

        /*
           Do NOT put a white/black background here.
           Background component controls it.
        */
        // background:
        //   COLORS.backgroundBottom,
      }}
    >
      {/* ===================================================
          REFERENCE BACKGROUND
      =================================================== */}

      {/* <Background /> */}

      {/* ===================================================
          GLOBE
      =================================================== */}

      <div
        className="
          relative
          z-[1]
          flex
          items-center
          justify-center
          w-full
          h-full
        "
      >
        <Canvas
          dpr={[
            1,
            2,
          ]}
          camera={{
            position: [
              0,
              0,
              2.78,
              
            ],

            /*
               Narrow FOV keeps the globe large,
               similar to the reference.
            */

            fov: 42,

            near: 0.1,
            far: 100,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference:
              "high-performance",
          }}
          style={{
            width: "100%",
            height: "100%",
            background:
              "transparent",
          }}
        >
          {/* =================================================
              LIGHTING
          ================================================= */}

          <ambientLight
            intensity={1.05}
          />

          {/* Bright upper-left illumination */}

          <directionalLight
            position={[
              -4,
              5,
              5,
            ]}
            intensity={2.4}
            color="#35bde9"
          />

          {/* Dark blue opposite side */}

          <directionalLight
            position={[
              4,
              -2,
              -4,
            ]}
            intensity={0.32}
            color="#063b67"
          />

          {/* Cyan center glow */}

          <pointLight
            position={[
              -1,
              2,
              4,
            ]}
            intensity={0.55}
            color="#2ac4f4"
          />

          {/* =================================================
              GLOBE
          ================================================= */}

          <Globe />

          {/* =================================================
              USER INTERACTION

              Auto rotation continues because it is
              controlled by Globe's useFrame.

              Dragging allows manual rotation.
          ================================================= */}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.04}
            rotateSpeed={0.38}
            minPolarAngle={
              Math.PI * 0.27
            }
            maxPolarAngle={
              Math.PI * 0.73
            }
          />
        </Canvas>
      </div>
    </div>
  );
}