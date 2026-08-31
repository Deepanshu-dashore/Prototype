// import React from "react";

// const Globe = () => {
//   return (
//     <>
//       <style>
//         {`
//           @keyframes earthRotate {
//             0% {
//               background-position: 0 0;
//             }

//             100% {
//               background-position: 400px 0;
//             }
//           }

//           @keyframes twinkling {
//             0%,
//             100% {
//               opacity: 0.1;
//             }

//             50% {
//               opacity: 1;
//             }
//           }

//           @keyframes twinkling-slow {
//             0%,
//             100% {
//               opacity: 0.1;
//             }

//             50% {
//               opacity: 1;
//             }
//           }

//           @keyframes twinkling-long {
//             0%,
//             100% {
//               opacity: 0.1;
//             }

//             50% {
//               opacity: 1;
//             }
//           }

//           @keyframes twinkling-fast {
//             0%,
//             100% {
//               opacity: 0.1;
//             }

//             50% {
//               opacity: 1;
//             }
//           }
//         `}
//       </style>

//       <div className="flex items-center justify-center h-screen">
//         <div
//           className="
//             relative
//             w-[250px]
//             h-[250px]
//             rounded-full
//             overflow-hidden
//             shadow-[
//               0_0_20px_rgba(255,255,255,0.2),
//               -5px_0_8px_#c3f4ff_inset,
//               15px_2px_25px_#000_inset,
//               -24px_-2px_34px_#c3f4ff99_inset,
//               250px_0_44px_#00000066_inset,
//               150px_0_38px_#000000aa_inset
//             ]
//           "
//           style={{
//             backgroundImage:
//               "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
//             backgroundSize: "cover",
//             backgroundPosition: "left",
//             animation: "earthRotate 30s linear infinite",
//           }}
//         >
//           {/* Stars */}

//           <div
//             className="absolute left-[-20px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling 3s infinite",
//             }}
//           />

//           <div
//             className="absolute left-[-40px] top-[30px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling-slow 2s infinite",
//             }}
//           />

//           <div
//             className="absolute left-[350px] top-[90px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling-long 4s infinite",
//             }}
//           />

//           <div
//             className="absolute left-[200px] top-[290px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling 3s infinite",
//             }}
//           />

//           <div
//             className="absolute left-[50px] top-[270px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling-fast 1.5s infinite",
//             }}
//           />

//           <div
//             className="absolute left-[250px] top-[-50px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling-long 4s infinite",
//             }}
//           />

//           <div
//             className="absolute left-[290px] top-[60px] w-1 h-1 bg-white rounded-full"
//             style={{
//               animation: "twinkling-slow 2s infinite",
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Globe;
import React from "react";

const Globe = () => {
  return (
    <div className="relative flex items-center justify-center w-[400px] h-[400px]">

      {/* =====================================================
          OUTER ATMOSPHERE GLOW
      ====================================================== */}
      <div
        className="
          absolute
          w-[380px]
          h-[380px]
          rounded-full
          bg-[#4d8dff]/10
          blur-[35px]
        "
      />

      <div
        className="
          absolute
          w-[345px]
          h-[345px]
          rounded-full
          border border-blue-200/20
        "
      />

      {/* =====================================================
          STARS
      ====================================================== */}

      <span
        className="
          absolute
          top-[35px]
          left-[55px]
          w-[4px]
          h-[4px]
          rounded-full
          bg-white
          opacity-80
          animate-pulse
        "
      />

      <span
        className="
          absolute
          top-[80px]
          right-[45px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-white
          opacity-60
          animate-pulse
        "
      />

      <span
        className="
          absolute
          bottom-[75px]
          left-[35px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-white
          opacity-70
          animate-pulse
        "
      />

      <span
        className="
          absolute
          bottom-[40px]
          right-[70px]
          w-[4px]
          h-[4px]
          rounded-full
          bg-white
          opacity-60
          animate-pulse
        "
      />

      <span
        className="
          absolute
          top-[150px]
          left-[15px]
          w-[2px]
          h-[2px]
          rounded-full
          bg-white
          opacity-80
        "
      />

      <span
        className="
          absolute
          top-[210px]
          right-[15px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-white
          opacity-70
        "
      />

      {/* =====================================================
          GLOBE
      ====================================================== */}

      <div
        className="
          relative
          w-[310px]
          h-[310px]
          rounded-full
          overflow-hidden
          border
          border-blue-100/30
          shadow-[0_0_45px_rgba(100,170,255,0.35)]
        "
      >

        {/* Earth texture */}
        <div
          className="
            absolute
            inset-0
            rounded-full
          "
          style={{
            backgroundImage:
              "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",

            backgroundSize: "auto 100%",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "0% center",

            animation: "earthRotate 35s linear infinite",
          }}
        />

        {/* =================================================
            BLUE OCEAN TINT
        ================================================== */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-blue-500/10
            mix-blend-screen
          "
        />

        {/* =================================================
            DARK SIDE / SPHERICAL SHADING
        ================================================== */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-[radial-gradient(circle_at_30%_30%,transparent_0%,transparent_42%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.65)_100%)]
          "
        />

        {/* =================================================
            ATMOSPHERE
        ================================================== */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            border
            border-white/20
            shadow-[inset_10px_5px_30px_rgba(180,230,255,0.45)]
          "
        />

        {/* =================================================
            LIGHT REFLECTION
        ================================================== */}
        <div
          className="
            absolute
            top-[12%]
            left-[15%]
            w-[120px]
            h-[80px]
            rounded-full
            bg-white/10
            blur-[25px]
          "
        />

      </div>

      {/* =====================================================
          OUTER BLUE RING
      ====================================================== */}

      <div
        className="
          absolute
          w-[325px]
          h-[325px]
          rounded-full
          border
          border-blue-300/10
          pointer-events-none
        "
      />

      <style>
        {`
          @keyframes earthRotate {
            from {
              background-position: 0% center;
            }

            to {
              background-position: 200% center;
            }
          }
        `}
      </style>

    </div>
  );
};

export default Globe;