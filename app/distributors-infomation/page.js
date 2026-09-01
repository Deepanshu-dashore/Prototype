
//   "use client";

//   import React, {
//     useMemo,
//     useState,
//   } from "react";

//   import {
//     BuildingOffice2Icon,
//     MapPinIcon,
//     PhoneIcon,
//     EnvelopeIcon,
//     GlobeAltIcon,
//     MagnifyingGlassIcon,
//     ChevronDownIcon,
//     UsersIcon,
//     ArrowTopRightOnSquareIcon,
//     CheckCircleIcon,
//   } from "@heroicons/react/24/outline";

//   import { useApiClient } from "@/src/config/axios";
//   import Footer from "@/src/components/share/Footer";
//   import Header from "@/src/components/share/Header";
// import Globe from "@/src/components/share/Glob";

// // ======================================================
// // COUNTRY FLAG
// // ======================================================

// function getCountryCode(country = "") {
//   const value = String(country)
//     .trim()
//     .toLowerCase();

//   // ----------------------------------------------------
//   // EUROPE
//   // ----------------------------------------------------

//   if (value.includes("ireland")) return "IE";
//   if (value.includes("germany")) return "DE";

//   if (
//     value.includes("united kingdom") ||
//     value === "uk" ||
//     value.includes("england")
//   ) {
//     return "GB";
//   }

//   if (value.includes("czech")) return "CZ";
//   if (value.includes("spain")) return "ES";
//   if (value.includes("romania")) return "RO";
//   if (value.includes("finland")) return "FI";
//   if (value.includes("france")) return "FR";
//   if (value.includes("italy")) return "IT";
//   if (value.includes("netherlands")) return "NL";
//   if (value.includes("belgium")) return "BE";
//   if (value.includes("poland")) return "PL";
//   if (value.includes("sweden")) return "SE";
//   if (value.includes("norway")) return "NO";
//   if (value.includes("denmark")) return "DK";
//   if (value.includes("switzerland")) return "CH";
//   if (value.includes("austria")) return "AT";
//   if (value.includes("portugal")) return "PT";
//   if (value.includes("greece")) return "GR";

//   // ----------------------------------------------------
//   // ASIA
//   // ----------------------------------------------------

//   if (value.includes("india")) return "IN";
//   if (value.includes("malaysia")) return "MY";
//   if (value.includes("singapore")) return "SG";
//   if (value.includes("china")) return "CN";
//   if (value.includes("japan")) return "JP";

//   if (
//     value.includes("south korea") ||
//     value === "korea" ||
//     value.includes("korea")
//   ) {
//     return "KR";
//   }

//   if (value.includes("indonesia")) return "ID";
//   if (value.includes("thailand")) return "TH";
//   if (value.includes("vietnam")) return "VN";
//   if (value.includes("philippines")) return "PH";
//   if (value.includes("taiwan")) return "TW";

//   // ----------------------------------------------------
//   // AFRICA
//   // ----------------------------------------------------

//   if (value.includes("south africa")) return "ZA";
//   if (value.includes("nigeria")) return "NG";
//   if (value.includes("kenya")) return "KE";
//   if (value.includes("egypt")) return "EG";
//   if (value.includes("morocco")) return "MA";

//   // ----------------------------------------------------
//   // NORTH AMERICA
//   // ----------------------------------------------------

//   if (
//     value.includes("united states") ||
//     value === "usa" ||
//     value.includes("america")
//   ) {
//     return "US";
//   }

//   if (value.includes("canada")) return "CA";
//   if (value.includes("mexico")) return "MX";
//   if (value.includes("costa rica")) return "CR";
//   if (value.includes("panama")) return "PA";

//   // ----------------------------------------------------
//   // SOUTH AMERICA
//   // ----------------------------------------------------

//   if (value.includes("brazil")) return "BR";
//   if (value.includes("argentina")) return "AR";
//   if (value.includes("chile")) return "CL";
//   if (value.includes("colombia")) return "CO";
//   if (value.includes("peru")) return "PE";

//   return "";
// }




// // ======================================================
// // NORMALIZE COUNTRY CODE
// // ======================================================
// function normalizeCountryCode(
//   flag,
//   country = ""
// ) {
//   // First try API flag
//   const apiFlagCode =
//     flagToCountryCode(flag);

//   if (apiFlagCode) {
//     return apiFlagCode;
//   }

//   // Then detect from country
//   return getCountryCode(country);
// }
// function ManualFlag({ countryCode }) {
//   const code = String(countryCode || "").toUpperCase();

//   const commonClass =
//     "h-7 w-10 rounded-md object-cover";

//   switch (code) {
//     case "IN":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="India flag"
//         >
//           <rect width="60" height="13.33" fill="#FF9933" />
//           <rect y="13.33" width="60" height="13.34" fill="#FFFFFF" />
//           <rect y="26.67" width="60" height="13.33" fill="#138808" />
//           <circle
//             cx="30"
//             cy="20"
//             r="5"
//             fill="none"
//             stroke="#000080"
//             strokeWidth="1"
//           />
//           <circle cx="30" cy="20" r="1.2" fill="#000080" />
//         </svg>
//       );

//     case "US":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="United States flag"
//         >
//           <rect width="60" height="40" fill="#B22234" />

//           <path
//             d="
//               M0 4H60
//               M0 10H60
//               M0 16H60
//               M0 22H60
//               M0 28H60
//               M0 34H60
//             "
//             stroke="#FFFFFF"
//             strokeWidth="4"
//           />

//           <rect width="25" height="21" fill="#3C3B6E" />
//         </svg>
//       );

//     case "GB":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="United Kingdom flag"
//         >
//           <rect width="60" height="40" fill="#012169" />

//           <path
//             d="M0 0L60 40M60 0L0 40"
//             stroke="#FFFFFF"
//             strokeWidth="8"
//           />

//           <path
//             d="M0 0L60 40M60 0L0 40"
//             stroke="#C8102E"
//             strokeWidth="4"
//           />

//           <path
//             d="M30 0V40M0 20H60"
//             stroke="#FFFFFF"
//             strokeWidth="12"
//           />

//           <path
//             d="M30 0V40M0 20H60"
//             stroke="#C8102E"
//             strokeWidth="7"
//           />
//         </svg>
//       );

//     case "DE":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Germany flag"
//         >
//           <rect width="60" height="13.33" fill="#000000" />
//           <rect y="13.33" width="60" height="13.34" fill="#DD0000" />
//           <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
//         </svg>
//       );

//     case "FR":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="France flag"
//         >
//           <rect width="20" height="40" fill="#0055A4" />
//           <rect x="20" width="20" height="40" fill="#FFFFFF" />
//           <rect x="40" width="20" height="40" fill="#EF4135" />
//         </svg>
//       );

//     case "IT":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Italy flag"
//         >
//           <rect width="20" height="40" fill="#009246" />
//           <rect x="20" width="20" height="40" fill="#FFFFFF" />
//           <rect x="40" width="20" height="40" fill="#CE2B37" />
//         </svg>
//       );

//     case "ES":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Spain flag"
//         >
//           <rect width="60" height="40" fill="#AA151B" />
//           <rect y="10" width="60" height="20" fill="#F1BF00" />
//         </svg>
//       );

//     case "CA":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Canada flag"
//         >
//           <rect width="60" height="40" fill="#FFFFFF" />
//           <rect width="15" height="40" fill="#FF0000" />
//           <rect x="45" width="15" height="40" fill="#FF0000" />
//           <path
//             d="M30 8L33 16L40 15L36 21L40 27L33 25L30 33L27 25L20 27L24 21L20 15L27 16Z"
//             fill="#FF0000"
//           />
//         </svg>
//       );

//     case "MX":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Mexico flag"
//         >
//           <rect width="20" height="40" fill="#006847" />
//           <rect x="20" width="20" height="40" fill="#FFFFFF" />
//           <rect x="40" width="20" height="40" fill="#CE1126" />
//         </svg>
//       );

//     case "BR":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Brazil flag"
//         >
//           <rect width="60" height="40" fill="#009B3A" />
//           <polygon
//             points="30,5 55,20 30,35 5,20"
//             fill="#FFDF00"
//           />
//           <circle cx="30" cy="20" r="9" fill="#002776" />
//         </svg>
//       );

//     case "AU":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Australia flag"
//         >
//           <rect width="60" height="40" fill="#00008B" />
//           <rect width="30" height="20" fill="#012169" />
//           <path
//             d="M0 0L30 20M30 0L0 20"
//             stroke="#FFFFFF"
//             strokeWidth="5"
//           />
//           <path
//             d="M0 0L30 20M30 0L0 20"
//             stroke="#C8102E"
//             strokeWidth="2"
//           />
//           <circle cx="45" cy="12" r="3" fill="#FFFFFF" />
//           <circle cx="50" cy="25" r="2" fill="#FFFFFF" />
//           <circle cx="40" cy="30" r="2" fill="#FFFFFF" />
//         </svg>
//       );

//     case "JP":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Japan flag"
//         >
//           <rect width="60" height="40" fill="#FFFFFF" />
//           <circle cx="30" cy="20" r="9" fill="#BC002D" />
//         </svg>
//       );

//     case "CN":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="China flag"
//         >
//           <rect width="60" height="40" fill="#DE2910" />
//           <polygon
//             points="10,5 11.8,10.5 17.5,10.5 13,14 14.7,19.5 10,16 5.3,19.5 7,14 2.5,10.5 8.2,10.5"
//             fill="#FFDE00"
//           />
//         </svg>
//       );

//     case "SG":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Singapore flag"
//         >
//           <rect width="60" height="20" fill="#ED2939" />
//           <rect y="20" width="60" height="20" fill="#FFFFFF" />
//           <circle cx="13" cy="10" r="6" fill="#FFFFFF" />
//           <circle cx="15" cy="10" r="5" fill="#ED2939" />
//         </svg>
//       );

//     case "MY":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Malaysia flag"
//         >
//           <rect width="60" height="40" fill="#CC0001" />
//           <path
//             d="M0 4H60M0 12H60M0 20H60M0 28H60M0 36H60"
//             stroke="#FFFFFF"
//             strokeWidth="4"
//           />
//           <rect width="28" height="21" fill="#010066" />
//           <circle cx="13" cy="10" r="6" fill="#FFCC00" />
//           <circle cx="16" cy="10" r="5" fill="#010066" />
//         </svg>
//       );

//     case "ZA":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="South Africa flag"
//         >
//           <rect width="60" height="40" fill="#007A4D" />
//           <path
//             d="M0 0L25 20L0 40"
//             fill="#FFB612"
//           />
//           <path
//             d="M0 0L30 20L0 40"
//             stroke="#FFFFFF"
//             strokeWidth="10"
//           />
//           <path
//             d="M0 0L30 20L0 40"
//             stroke="#000000"
//             strokeWidth="5"
//           />
//         </svg>
//       );

//     case "CH":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Switzerland flag"
//         >
//           <rect width="60" height="40" fill="#FF0000" />
//           <rect x="25" y="8" width="10" height="24" fill="#FFFFFF" />
//           <rect x="18" y="15" width="24" height="10" fill="#FFFFFF" />
//         </svg>
//       );

//     case "AT":
//       return (
//         <svg
//           viewBox="0 0 60 40"
//           className={commonClass}
//           aria-label="Austria flag"
//         >
//           <rect width="60" height="13.33" fill="#ED2939" />
//           <rect y="13.33" width="60" height="13.34" fill="#FFFFFF" />
//           <rect y="26.67" width="60" height="13.33" fill="#ED2939" />
//         </svg>
//       );

//     default:
//       return (
//         <span
//           className="
//             flex
//             h-7
//             w-10
//             items-center
//             justify-center
//             rounded-md
//             bg-[#EAF0FF]
//             text-[#173DB8]
//           "
//           title="Country"
//         >
//           <GlobeAltIcon className="h-5 w-5" />
//         </span>
//       );
//   }
// }

// // ======================================================
// // COUNTRY FLAG COMPONENT
// // ======================================================

// "use client";

// import React, {
//   useMemo,
//   useState,
// } from "react";

// import {
//   BuildingOffice2Icon,
//   MapPinIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   GlobeAltIcon,
//   MagnifyingGlassIcon,
//   ChevronDownIcon,
//   UsersIcon,
//   ArrowTopRightOnSquareIcon,
//   CheckCircleIcon,
// } from "@heroicons/react/24/outline";

// import { useApiClient } from "@/src/config/axios";
// import Footer from "@/src/components/share/Footer";
// import Header from "@/src/components/share/Header";
// import Globe from "@/src/components/share/Glob";

// // ======================================================
// // COUNTRY CODE
// // ======================================================

// function getCountryCode(country = "") {
//   const value = String(country)
//     .trim()
//     .toLowerCase();

//   // ----------------------------------------------------
//   // EUROPE
//   // ----------------------------------------------------

//   if (value.includes("ireland")) return "IE";
//   if (value.includes("germany")) return "DE";

//   if (
//     value.includes("united kingdom") ||
//     value === "uk" ||
//     value.includes("england")
//   ) {
//     return "GB";
//   }

//   if (
//     value.includes("czech") ||
//     value.includes("czech republic")
//   ) {
//     return "CZ";
//   }

//   if (value.includes("spain")) return "ES";
//   if (value.includes("romania")) return "RO";
//   if (value.includes("finland")) return "FI";
//   if (value.includes("france")) return "FR";
//   if (value.includes("italy")) return "IT";
//   if (value.includes("netherlands")) return "NL";
//   if (value.includes("belgium")) return "BE";
//   if (value.includes("poland")) return "PL";
//   if (value.includes("sweden")) return "SE";
//   if (value.includes("norway")) return "NO";
//   if (value.includes("denmark")) return "DK";
//   if (value.includes("switzerland")) return "CH";
//   if (value.includes("austria")) return "AT";
//   if (value.includes("portugal")) return "PT";
//   if (value.includes("greece")) return "GR";

//   // ----------------------------------------------------
//   // ASIA
//   // ----------------------------------------------------

//   if (value.includes("india")) return "IN";
//   if (value.includes("malaysia")) return "MY";
//   if (value.includes("singapore")) return "SG";
//   if (value.includes("china")) return "CN";
//   if (value.includes("japan")) return "JP";

//   if (
//     value.includes("south korea") ||
//     value === "korea" ||
//     value.includes("korea")
//   ) {
//     return "KR";
//   }

//   if (value.includes("indonesia")) return "ID";
//   if (value.includes("thailand")) return "TH";
//   if (value.includes("vietnam")) return "VN";
//   if (value.includes("philippines")) return "PH";
//   if (value.includes("taiwan")) return "TW";

//   // ----------------------------------------------------
//   // AFRICA
//   // ----------------------------------------------------

//   if (value.includes("south africa")) return "ZA";
//   if (value.includes("nigeria")) return "NG";
//   if (value.includes("kenya")) return "KE";
//   if (value.includes("egypt")) return "EG";
//   if (value.includes("morocco")) return "MA";

//   // ----------------------------------------------------
//   // NORTH AMERICA
//   // ----------------------------------------------------

//   if (
//     value.includes("united states") ||
//     value === "usa" ||
//     value.includes("america")
//   ) {
//     return "US";
//   }

//   if (value.includes("canada")) return "CA";
//   if (value.includes("mexico")) return "MX";
//   if (value.includes("costa rica")) return "CR";
//   if (value.includes("panama")) return "PA";

//   // ----------------------------------------------------
//   // SOUTH AMERICA
//   // ----------------------------------------------------

//   if (value.includes("brazil")) return "BR";
//   if (value.includes("argentina")) return "AR";
//   if (value.includes("chile")) return "CL";
//   if (value.includes("colombia")) return "CO";
//   if (value.includes("peru")) return "PE";

//   return "";
// }


// // ======================================================
// // API FLAG → COUNTRY CODE
// // ======================================================

// function flagToCountryCode(flag = "") {
//   const value = String(flag || "").trim();

//   if (!value) {
//     return "";
//   }

//   // ISO code
//   if (/^[A-Za-z]{2}$/.test(value)) {
//     return value.toUpperCase();
//   }

//   // Country flag emoji
//   const regionalIndicators = [
//     ...value,
//   ]
//     .map((char) => char.codePointAt(0))
//     .filter(
//       (code) =>
//         code >= 127462 &&
//         code <= 127487
//     );

//   if (regionalIndicators.length >= 2) {
//     return regionalIndicators
//       .slice(0, 2)
//       .map(
//         (code) =>
//           String.fromCharCode(
//             65 + (code - 127462)
//           )
//       )
//       .join("");
//   }

//   // Country name
//   return getCountryCode(value);
// }


// // ======================================================
// // NORMALIZE COUNTRY CODE
// // ======================================================

// function normalizeCountryCode(
//   flag,
//   country = ""
// ) {
//   const apiFlagCode =
//     flagToCountryCode(flag);

//   if (apiFlagCode) {
//     return apiFlagCode;
//   }

//   return getCountryCode(country);
// }


// // ======================================================
// // MANUAL SVG FLAGS
// // ======================================================

// function ManualFlag({
//   countryCode,
// }) {
//   switch (countryCode) {
//     // ==================================================
//     // MEXICO
//     // ==================================================

//     case "MX":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect width="30" height="60" fill="#006847" />
//           <rect x="30" width="30" height="60" fill="#fff" />
//           <rect x="60" width="30" height="60" fill="#CE1126" />

//           <circle
//             cx="45"
//             cy="30"
//             r="7"
//             fill="#8C6239"
//           />

//           <path
//             d="M45 23c-3 3-4 7-3 11 2-2 5-2 7 0 1-4 0-8-4-11z"
//             fill="#2E7D32"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="2"
//             fill="#A67C52"
//           />
//         </svg>
//       );

//     // ==================================================
//     // COSTA RICA
//     // ==================================================

//     case "CR":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect width="90" height="60" fill="#fff" />

//           <rect
//             y="0"
//             width="90"
//             height="10"
//             fill="#002B7F"
//           />

//           <rect
//             y="10"
//             width="90"
//             height="10"
//             fill="#CE1126"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#fff"
//           />

//           <rect
//             y="40"
//             width="90"
//             height="10"
//             fill="#CE1126"
//           />

//           <rect
//             y="50"
//             width="90"
//             height="10"
//             fill="#002B7F"
//           />

//           <circle
//             cx="20"
//             cy="30"
//             r="6"
//             fill="#fff"
//             stroke="#777"
//             strokeWidth="0.5"
//           />

//           <circle
//             cx="20"
//             cy="30"
//             r="3"
//             fill="#6B7280"
//           />
//         </svg>
//       );

//     // ==================================================
//     // FINLAND
//     // ==================================================

//     case "FI":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="25"
//             width="10"
//             height="60"
//             fill="#003580"
//           />

//           <rect
//             y="25"
//             width="90"
//             height="10"
//             fill="#003580"
//           />
//         </svg>
//       );

//     // ==================================================
//     // SPAIN
//     // ==================================================

//     case "ES":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#AA151B"
//           />

//           <rect
//             y="15"
//             width="90"
//             height="30"
//             fill="#F1BF00"
//           />

//           <rect
//             x="18"
//             y="23"
//             width="5"
//             height="14"
//             fill="#AA151B"
//           />

//           <circle
//             cx="21"
//             cy="30"
//             r="2"
//             fill="#F1BF00"
//           />
//         </svg>
//       );

//     // ==================================================
//     // ROMANIA
//     // ==================================================

//     case "RO":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#002B7F"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#FCD116"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#CE1126"
//           />
//         </svg>
//       );

//     // ==================================================
//     // CZECH REPUBLIC
//     // ==================================================

//     case "CZ":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="30"
//             fill="#fff"
//           />

//           <rect
//             y="30"
//             width="90"
//             height="30"
//             fill="#D7141A"
//           />

//           <path
//             d="M0 0 L45 30 L0 60 Z"
//             fill="#11457E"
//           />
//         </svg>
//       );

//     // ==================================================
//     // IRELAND
//     // ==================================================

//     case "IE":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#169B62"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#FF883E"
//           />
//         </svg>
//       );

//     // ==================================================
//     // GERMANY
//     // ==================================================

//     case "DE":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="20"
//             fill="#000"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#DD0000"
//           />

//           <rect
//             y="40"
//             width="90"
//             height="20"
//             fill="#FFCE00"
//           />
//         </svg>
//       );

//     // ==================================================
//     // UNITED KINGDOM
//     // ==================================================

//     case "GB":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#012169"
//           />

//           <path
//             d="M0 0 L90 60 M90 0 L0 60"
//             stroke="#fff"
//             strokeWidth="12"
//           />

//           <path
//             d="M0 0 L90 60 M90 0 L0 60"
//             stroke="#C8102E"
//             strokeWidth="5"
//           />

//           <path
//             d="M45 0V60 M0 30H90"
//             stroke="#fff"
//             strokeWidth="20"
//           />

//           <path
//             d="M45 0V60 M0 30H90"
//             stroke="#C8102E"
//             strokeWidth="10"
//           />
//         </svg>
//       );

//     // ==================================================
//     // FRANCE
//     // ==================================================

//     case "FR":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#0055A4"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#EF4135"
//           />
//         </svg>
//       );

//     // ==================================================
//     // ITALY
//     // ==================================================

//     case "IT":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#009246"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#CE2B37"
//           />
//         </svg>
//       );

//     // ==================================================
//     // NETHERLANDS
//     // ==================================================

//     case "NL":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="20"
//             fill="#AE1C28"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#fff"
//           />

//           <rect
//             y="40"
//             width="90"
//             height="20"
//             fill="#21468B"
//           />
//         </svg>
//       );

//     // ==================================================
//     // BELGIUM
//     // ==================================================

//     case "BE":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#000"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#FAE042"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#ED2939"
//           />
//         </svg>
//       );

//     // ==================================================
//     // POLAND
//     // ==================================================

//     case "PL":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="30"
//             fill="#fff"
//           />

//           <rect
//             y="30"
//             width="90"
//             height="30"
//             fill="#DC143C"
//           />
//         </svg>
//       );

//     // ==================================================
//     // SWEDEN
//     // ==================================================

//     case "SE":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#006AA7"
//           />

//           <rect
//             x="25"
//             width="10"
//             height="60"
//             fill="#FECC00"
//           />

//           <rect
//             y="25"
//             width="90"
//             height="10"
//             fill="#FECC00"
//           />
//         </svg>
//       );

//     // ==================================================
//     // NORWAY
//     // ==================================================

//     case "NO":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#BA0C2F"
//           />

//           <rect
//             x="25"
//             width="18"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             y="21"
//             width="90"
//             height="18"
//             fill="#fff"
//           />

//           <rect
//             x="29"
//             width="10"
//             height="60"
//             fill="#00205B"
//           />

//           <rect
//             y="25"
//             width="90"
//             height="10"
//             fill="#00205B"
//           />
//         </svg>
//       );

//     // ==================================================
//     // DENMARK
//     // ==================================================

//     case "DK":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#C8102E"
//           />

//           <rect
//             x="25"
//             width="10"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             y="25"
//             width="90"
//             height="10"
//             fill="#fff"
//           />
//         </svg>
//       );

//     // ==================================================
//     // SWITZERLAND
//     // ==================================================

//     case "CH":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             rx="4"
//             fill="#D52B1E"
//           />

//           <rect
//             x="38"
//             y="12"
//             width="14"
//             height="36"
//             fill="#fff"
//           />

//           <rect
//             x="27"
//             y="23"
//             width="36"
//             height="14"
//             fill="#fff"
//           />
//         </svg>
//       );

//     // ==================================================
//     // INDIA
//     // ==================================================

//     case "IN":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="20"
//             fill="#FF9933"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#fff"
//           />

//           <rect
//             y="40"
//             width="90"
//             height="20"
//             fill="#138808"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="7"
//             fill="none"
//             stroke="#000080"
//             strokeWidth="1.5"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="1.5"
//             fill="#000080"
//           />
//         </svg>
//       );

//     // ==================================================
//     // MALAYSIA
//     // ==================================================

//     case "MY":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#CC0001"
//           />

//           <path
//             d="M0 0H90V7H0ZM0 14H90V21H0ZM0 28H90V35H0ZM0 42H90V49H0ZM0 56H90V60H0Z"
//             fill="#fff"
//           />

//           <rect
//             width="45"
//             height="30"
//             fill="#010066"
//           />

//           <circle
//             cx="18"
//             cy="15"
//             r="8"
//             fill="#FFCC00"
//           />

//           <circle
//             cx="21"
//             cy="13"
//             r="7"
//             fill="#010066"
//           />
//         </svg>
//       );

//     // ==================================================
//     // SINGAPORE
//     // ==================================================

//     case "SG":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="30"
//             fill="#EF3340"
//           />

//           <rect
//             y="30"
//             width="90"
//             height="30"
//             fill="#fff"
//           />

//           <circle
//             cx="18"
//             cy="15"
//             r="9"
//             fill="#fff"
//           />

//           <circle
//             cx="22"
//             cy="15"
//             r="8"
//             fill="#EF3340"
//           />
//         </svg>
//       );

//     // ==================================================
//     // CHINA
//     // ==================================================

//     case "CN":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#DE2910"
//           />

//           <polygon
//             points="15,8 17,14 24,14 19,18 21,25 15,21 9,25 11,18 6,14 13,14"
//             fill="#FFDE00"
//           />
//         </svg>
//       );

//     // ==================================================
//     // JAPAN
//     // ==================================================

//     case "JP":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#fff"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="15"
//             fill="#BC002D"
//           />
//         </svg>
//       );

//     // ==================================================
//     // SOUTH KOREA
//     // ==================================================

//     case "KR":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#fff"
//           />

//           <path
//             d="M45 17a13 13 0 0 1 0 26a6.5 6.5 0 0 0 0-13a6.5 6.5 0 0 1 0-13z"
//             fill="#CD2E3A"
//           />

//           <path
//             d="M45 17a13 13 0 0 0 0 26a6.5 6.5 0 0 0 0-13a6.5 6.5 0 0 1 0-13z"
//             fill="#0047A0"
//           />

//           <path
//             d="M14 12l12 7M13 16l11 7M14 48l12-7M13 44l11-7"
//             stroke="#000"
//             strokeWidth="3"
//           />

//           <path
//             d="M64 19l12-7M66 23l11-7M64 41l12 7M66 37l11 7"
//             stroke="#000"
//             strokeWidth="3"
//           />
//         </svg>
//       );

//     // ==================================================
//     // INDONESIA
//     // ==================================================

//     case "ID":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="30"
//             fill="#CE1126"
//           />

//           <rect
//             y="30"
//             width="90"
//             height="30"
//             fill="#fff"
//           />
//         </svg>
//       );

//     // ==================================================
//     // THAILAND
//     // ==================================================

//     case "TH":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#A51931"
//           />

//           <rect
//             y="10"
//             width="90"
//             height="40"
//             fill="#fff"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#2D2A4A"
//           />
//         </svg>
//       );

//     // ==================================================
//     // VIETNAM
//     // ==================================================

//     case "VN":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#DA251D"
//           />

//           <polygon
//             points="45,12 49,25 63,25 52,33 56,47 45,39 34,47 38,33 27,25 41,25"
//             fill="#FFDE00"
//           />
//         </svg>
//       );

//     // ==================================================
//     // SOUTH AFRICA
//     // ==================================================

//     case "ZA":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#007A4D"
//           />

//           <path
//             d="M0 0L45 30L0 60Z"
//             fill="#000"
//           />

//           <path
//             d="M0 0L45 30L0 60"
//             stroke="#FFB81C"
//             strokeWidth="14"
//             fill="none"
//           />

//           <path
//             d="M0 0L45 30L0 60"
//             stroke="#fff"
//             strokeWidth="8"
//             fill="none"
//           />

//           <path
//             d="M45 30H90"
//             stroke="#fff"
//             strokeWidth="18"
//           />

//           <path
//             d="M45 30H90"
//             stroke="#DE3831"
//             strokeWidth="10"
//           />
//         </svg>
//       );

//     // ==================================================
//     // NIGERIA
//     // ==================================================

//     case "NG":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#008751"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#008751"
//           />
//         </svg>
//       );

//     // ==================================================
//     // KENYA
//     // ==================================================

//     case "KE":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#006600"
//           />

//           <rect
//             y="0"
//             width="90"
//             height="18"
//             fill="#000"
//           />

//           <rect
//             y="18"
//             width="90"
//             height="6"
//             fill="#BB0000"
//           />

//           <rect
//             y="36"
//             width="90"
//             height="6"
//             fill="#BB0000"
//           />

//           <rect
//             y="42"
//             width="90"
//             height="18"
//             fill="#006600"
//           />

//           <path
//             d="M35 12L55 48L35 48L55 12Z"
//             fill="#fff"
//           />
//         </svg>
//       );

//     // ==================================================
//     // EGYPT
//     // ==================================================

//     case "EG":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="20"
//             fill="#CE1126"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#fff"
//           />

//           <rect
//             y="40"
//             width="90"
//             height="20"
//             fill="#000"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="5"
//             fill="#C09300"
//           />
//         </svg>
//       );

//     // ==================================================
//     // UNITED STATES
//     // ==================================================

//     case "US":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#fff"
//           />

//           <path
//             d="
//               M0 0H90V5H0ZM0 10H90V15H0ZM0 20H90V25H0ZM0 30H90V35H0ZM0 40H90V45H0ZM0 50H90V55H0
//             "
//             fill="#B22234"
//           />

//           <rect
//             width="38"
//             height="32"
//             fill="#3C3B6E"
//           />

//           <g fill="#fff">
//             <circle cx="6" cy="5" r="1" />
//             <circle cx="12" cy="5" r="1" />
//             <circle cx="18" cy="5" r="1" />
//             <circle cx="24" cy="5" r="1" />
//             <circle cx="30" cy="5" r="1" />

//             <circle cx="9" cy="10" r="1" />
//             <circle cx="15" cy="10" r="1" />
//             <circle cx="21" cy="10" r="1" />
//             <circle cx="27" cy="10" r="1" />

//             <circle cx="6" cy="15" r="1" />
//             <circle cx="12" cy="15" r="1" />
//             <circle cx="18" cy="15" r="1" />
//             <circle cx="24" cy="15" r="1" />
//             <circle cx="30" cy="15" r="1" />

//             <circle cx="9" cy="20" r="1" />
//             <circle cx="15" cy="20" r="1" />
//             <circle cx="21" cy="20" r="1" />
//             <circle cx="27" cy="20" r="1" />

//             <circle cx="6" cy="25" r="1" />
//             <circle cx="12" cy="25" r="1" />
//             <circle cx="18" cy="25" r="1" />
//             <circle cx="24" cy="25" r="1" />
//             <circle cx="30" cy="25" r="1" />
//           </g>
//         </svg>
//       );

//     // ==================================================
//     // CANADA
//     // ==================================================

//     case "CA":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="25"
//             height="60"
//             fill="#D80621"
//           />

//           <rect
//             x="25"
//             width="40"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="65"
//             width="25"
//             height="60"
//             fill="#D80621"
//           />

//           <path
//             d="
//               M45 10
//               L48 24
//               L57 20
//               L53 29
//               L62 32
//               L51 35
//               L54 47
//               L45 40
//               L36 47
//               L39 35
//               L28 32
//               L37 29
//               L33 20
//               L42 24
//               Z
//             "
//             fill="#D80621"
//           />
//         </svg>
//       );

//     // ==================================================
//     // PANAMA
//     // ==================================================

//     case "PA":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="45"
//             height="30"
//             fill="#fff"
//           />

//           <rect
//             x="45"
//             width="45"
//             height="30"
//             fill="#D21034"
//           />

//           <rect
//             y="30"
//             width="45"
//             height="30"
//             fill="#005293"
//           />

//           <rect
//             x="45"
//             y="30"
//             width="45"
//             height="30"
//             fill="#fff"
//           />

//           <polygon
//             points="22,9 24,15 30,15 25,19 27,25 22,21 17,25 19,19 14,15 20,15"
//             fill="#005293"
//           />

//           <polygon
//             points="67,39 69,45 75,45 70,49 72,55 67,51 62,55 64,49 59,45 65,45"
//             fill="#D21034"
//           />
//         </svg>
//       );

//     // ==================================================
//     // BRAZIL
//     // ==================================================

//     case "BR":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="60"
//             fill="#009C3B"
//           />

//           <polygon
//             points="45,6 83,30 45,54 7,30"
//             fill="#FFDF00"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="14"
//             fill="#002776"
//           />

//           <path
//             d="M31 27C40 24 51 25 59 29"
//             stroke="#fff"
//             strokeWidth="2"
//             fill="none"
//           />
//         </svg>
//       );

//     // ==================================================
//     // ARGENTINA
//     // ==================================================

//     case "AR":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="20"
//             fill="#74ACDF"
//           />

//           <rect
//             y="20"
//             width="90"
//             height="20"
//             fill="#fff"
//           />

//           <rect
//             y="40"
//             width="90"
//             height="20"
//             fill="#74ACDF"
//           />

//           <circle
//             cx="45"
//             cy="30"
//             r="5"
//             fill="#F6B40E"
//           />
//         </svg>
//       );

//     // ==================================================
//     // CHILE
//     // ==================================================

//     case "CL":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="30"
//             fill="#fff"
//           />

//           <rect
//             y="30"
//             width="90"
//             height="30"
//             fill="#D52B1E"
//           />

//           <rect
//             width="30"
//             height="30"
//             fill="#0039A6"
//           />

//           <polygon
//             points="15,7 17,13 23,13 18,17 20,23 15,19 10,23 12,17 7,13 13,13"
//             fill="#fff"
//           />
//         </svg>
//       );

//     // ==================================================
//     // COLOMBIA
//     // ==================================================

//     case "CO":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="90"
//             height="30"
//             fill="#FCD116"
//           />

//           <rect
//             y="30"
//             width="90"
//             height="15"
//             fill="#003893"
//           />

//           <rect
//             y="45"
//             width="90"
//             height="15"
//             fill="#CE1126"
//           />
//         </svg>
//       );

//     // ==================================================
//     // PERU
//     // ==================================================

//     case "PE":
//       return (
//         <svg
//           viewBox="0 0 90 60"
//           className="h-7 w-10 rounded-sm"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <rect
//             width="30"
//             height="60"
//             fill="#D91023"
//           />

//           <rect
//             x="30"
//             width="30"
//             height="60"
//             fill="#fff"
//           />

//           <rect
//             x="60"
//             width="30"
//             height="60"
//             fill="#D91023"
//           />
//         </svg>
//       );

//     // ==================================================
//     // DEFAULT
//     // ==================================================

//     default:
//       return (
//         <span
//           className="
//             text-xl
//             leading-none
//           "
//         >
//           🌍
//         </span>
//       );
//   }
// }




// // ======================================================
// // REGION DETECTION
// // ======================================================

// function detectRegion(country = "") {
//   const value =
//     String(country)
//       .toLowerCase();

//   // ----------------------------------------------------
//   // EUROPE
//   // ----------------------------------------------------

//   if (
//     [
//       "ireland",
//       "united kingdom",
//       "germany",
//       "czech",
//       "spain",
//       "romania",
//       "finland",
//       "france",
//       "italy",
//       "netherlands",
//       "belgium",
//       "poland",
//       "sweden",
//       "norway",
//       "denmark",
//       "switzerland",
//       "austria",
//       "portugal",
//       "greece",
//     ].some(
//       (item) =>
//         value.includes(item)
//     )
//   ) {
//     return "Europe";
//   }

//   // ----------------------------------------------------
//   // ASIA
//   // ----------------------------------------------------

//   if (
//     [
//       "india",
//       "malaysia",
//       "singapore",
//       "china",
//       "japan",
//       "korea",
//       "indonesia",
//       "thailand",
//       "vietnam",
//       "philippines",
//       "taiwan",
//     ].some(
//       (item) =>
//         value.includes(item)
//     )
//   ) {
//     return "Asia";
//   }

//   // ----------------------------------------------------
//   // AFRICA
//   // ----------------------------------------------------

//   if (
//     [
//       "south africa",
//       "africa",
//       "nigeria",
//       "kenya",
//       "egypt",
//       "morocco",
//     ].some(
//       (item) =>
//         value.includes(item)
//     )
//   ) {
//     return "Africa";
//   }

//   // ----------------------------------------------------
//   // NORTH AMERICA
//   // ----------------------------------------------------

//   if (
//     [
//       "united states",
//       "usa",
//       "america",
//       "mexico",
//       "costa rica",
//       "canada",
//       "panama",
//     ].some(
//       (item) =>
//         value.includes(item)
//     )
//   ) {
//     return "North America";
//   }

//   // ----------------------------------------------------
//   // SOUTH AMERICA
//   // ----------------------------------------------------

//   if (
//     [
//       "brazil",
//       "argentina",
//       "chile",
//       "colombia",
//       "peru",
//     ].some(
//       (item) =>
//         value.includes(item)
//     )
//   ) {
//     return "South America";
//   }

//   return "Other";
// }


// // ======================================================
// // WEBSITE URL
// // ======================================================

// function getWebsiteUrl(
//   website = ""
// ) {
//   if (!website) {
//     return "";
//   }

//   if (
//     website.startsWith(
//       "http://"
//     ) ||
//     website.startsWith(
//       "https://"
//     )
//   ) {
//     return website;
//   }

//   return `https://${website}`;
// }


// // ======================================================
// // NORMALIZE DISTRIBUTOR
// // ======================================================

// function normalizeDistributor(
//   item,
//   index
// ) {
//   if (!item) {
//     return null;
//   }

//   // ----------------------------------------------------
//   // COUNTRY
//   // ----------------------------------------------------

//   const country =
//     item.country ||
//     "International";

//   // ----------------------------------------------------
//   // COMPANY
//   // ----------------------------------------------------

//   const companyName =
//     item.companyName ||
//     item.company ||
//     item.name ||
//     "";

//   if (
//     !String(companyName).trim()
//   ) {
//     return null;
//   }

//   // ----------------------------------------------------
//   // EMAILS
//   // ----------------------------------------------------

//   let emails = [];

//   if (
//     Array.isArray(item.emails)
//   ) {
//     emails = item.emails
//       .map((email) =>
//         String(email).trim()
//       )
//       .filter(Boolean);
//   } else if (
//     typeof item.emails ===
//     "string"
//   ) {
//     emails = item.emails
//       .split(/[,;|]/)
//       .map((email) =>
//         email.trim()
//       )
//       .filter(Boolean);
//   } else if (
//     item.email
//   ) {
//     emails = [
//       String(item.email).trim(),
//     ].filter(Boolean);
//   }

//   // ----------------------------------------------------
//   // LOCATION
//   // ----------------------------------------------------

//   let location = "";

//   if (
//     typeof item.location ===
//     "string"
//   ) {
//     location =
//       item.location.trim();
//   } else {
//     location = [
//       item.city,
//       item.state ||
//         item.stateProvince ||
//         item.province,
//       country,
//       item.postalCode ||
//         item.zipCode ||
//         item.zip,
//     ]
//       .filter(Boolean)
//       .join(", ");
//   }

//   // ----------------------------------------------------
//   // WEBSITE
//   // ----------------------------------------------------

//   const website =
//     item.website ||
//     item.websiteUrl ||
//     item.url ||
//     "";

//   // ----------------------------------------------------
//   // PHONE
//   // ----------------------------------------------------

//   const phone =
//     item.phone ||
//     item.phoneNumber ||
//     "";

//   // ----------------------------------------------------
//   // REGION
//   // ----------------------------------------------------

//   const region =
//     item.region ||
//     item.continent ||
//     detectRegion(
//       country
//     );

//   // ----------------------------------------------------
//   // FLAG
//   // ----------------------------------------------------

//   const flag =
//     normalizeCountryCode(
//       item.flag,
//       country
//     );

//   // ----------------------------------------------------
//   // RETURN
//   // ----------------------------------------------------

//   return {
//     id:
//       item._id ||
//       item.id ||
//       `admin-distributor-${index}`,

//     companyName:
//       String(companyName).trim(),

//     country,

//     region,

//     location,

//     city:
//       item.city || "",

//     state:
//       item.state ||
//       item.stateProvince ||
//       item.province ||
//       "",

//     postalCode:
//       item.postalCode ||
//       item.zipCode ||
//       item.zip ||
//       "",

//     emails,

//     phone,

//     phoneDisplay:
//       item.phoneDisplay ||
//       phone ||
//       "N/A",

//     website,

//     flag,

//     status:
//       item.status ||
//       "Active",

//     sortOrder:
//       Number.isFinite(
//         Number(item.sortOrder)
//       )
//         ? Number(item.sortOrder)
//         : 0,
//   };
// }


// // ======================================================
// // MAIN COMPONENT
// // ======================================================

// export default function DistributorPage() {
//   const api =
//     useApiClient();

//   const [
//     search,
//     setSearch,
//   ] = useState("");

//   const [
//     selectedRegion,
//     setSelectedRegion,
//   ] = useState(
//     "All Regions"
//   );

//   // ====================================================
//   // ADMIN API
//   // ====================================================

//   const distributorsQuery =
//     api.useGet(
//       "distributors",
//       "/distributors"
//     );

//   // ====================================================
//   // GET API DATA
//   // ====================================================

//   const distributors =
//     useMemo(() => {
//       const response =
//         distributorsQuery?.data;

//       if (!response) {
//         return [];
//       }

//       let data = [];

//       // ------------------------------------------------
//       // { success: true, data: [...] }
//       // ------------------------------------------------

//       if (
//         Array.isArray(
//           response?.data
//         )
//       ) {
//         data =
//           response.data;
//       }

//       // ------------------------------------------------
//       // Direct array
//       // ------------------------------------------------

//       else if (
//         Array.isArray(response)
//       ) {
//         data = response;
//       }

//       // ------------------------------------------------
//       // { distributors: [...] }
//       // ------------------------------------------------

//       else if (
//         Array.isArray(
//           response?.distributors
//         )
//       ) {
//         data =
//           response.distributors;
//       }

//       // ------------------------------------------------
//       // { data: { distributors: [...] } }
//       // ------------------------------------------------

//       else if (
//         Array.isArray(
//           response?.data
//             ?.distributors
//         )
//       ) {
//         data =
//           response.data
//             .distributors;
//       }

//       // ------------------------------------------------
//       // { results: [...] }
//       // ------------------------------------------------

//       else if (
//         Array.isArray(
//           response?.results
//         )
//       ) {
//         data =
//           response.results;
//       }

//       return data
//         .map(
//           normalizeDistributor
//         )
//         .filter(Boolean)
//         .filter(
//           (item) =>
//             String(
//               item.status
//             ).toLowerCase() !==
//             "inactive"
//         );
//     }, [
//       distributorsQuery?.data,
//     ]);

//   // ====================================================
//   // REGIONS
//   // ====================================================

//   const regions =
//     useMemo(() => {
//       const regionList =
//         distributors
//           .map(
//             (item) =>
//               item.region
//           )
//           .filter(Boolean);

//       return [
//         "All Regions",
//         ...Array.from(
//           new Set(regionList)
//         ).sort(),
//       ];
//     }, [
//       distributors,
//     ]);

//   // ====================================================
//   // FILTERED DISTRIBUTORS
//   // ====================================================

//   const filteredDistributors =
//     useMemo(() => {
//       const searchValue =
//         search
//           .trim()
//           .toLowerCase();

//       return distributors.filter(
//         (distributor) => {
//           const searchableText = [
//             distributor.companyName,
//             distributor.country,
//             distributor.region,
//             distributor.location,
//             distributor.city,
//             distributor.state,
//             distributor.postalCode,
//             distributor.phone,
//             ...(distributor.emails ||
//               []),
//             distributor.website,
//           ]
//             .filter(Boolean)
//             .join(" ")
//             .toLowerCase();

//           const matchesSearch =
//             !searchValue ||
//             searchableText.includes(
//               searchValue
//             );

//           const matchesRegion =
//             selectedRegion ===
//               "All Regions" ||
//             distributor.region ===
//               selectedRegion;

//           return (
//             matchesSearch &&
//             matchesRegion
//           );
//         }
//       );
//     }, [
//       distributors,
//       search,
//       selectedRegion,
//     ]);

//   // ====================================================
//   // LOADING
//   // ====================================================

//   const isLoading =
//     distributorsQuery?.isLoading ||
//     distributorsQuery?.isPending;

//   // ====================================================
//   // ERROR
//   // ====================================================

//   const isError =
//     distributorsQuery?.isError;

//   // ====================================================
//   // UI
//   // ====================================================

//   return (
//     <>
//       <Header />

//       <main
//         className="
//           min-h-screen
//           bg-[#F7F9FC]
//         "
//       >

//         {/* =================================================
//             HERO
//         ================================================= */}

//         <section
//           className="
//             relative
//             overflow-hidden
//             bg-[#173DB8]
//             text-white
//           "
//         >
//           {/* Background */}

//           <div
//             className="
//               absolute
//               inset-0
//               pointer-events-none
//               opacity-[0.055]
//               bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
//               bg-[size:60px_60px]
//             "
//           />

//           <div
//             className="
//               absolute
//               -top-40
//               -right-40
//               h-96
//               w-96
//               rounded-full
//               bg-[#6E8BFF]/20
//               blur-3xl
//               pointer-events-none
//             "
//           />

//           <div
//             className="
//               absolute
//               -bottom-48
//               -left-40
//               h-96
//               w-96
//               rounded-full
//               bg-white/10
//               blur-3xl
//               pointer-events-none
//             "
//           />

//           {/* Content */}

//           <div
//             className="
//               relative
//               max-w-7xl
//               mx-auto
//               px-5
//               sm:px-8
//               py-14
//               sm:py-16
//               lg:py-20
//             "
//           >
//             <div
//               className="
//                 grid
//                 lg:grid-cols-[1.2fr_0.8fr]
//                 gap-20
//                 lg:gap-16
//                 items-center
//               "
//             >

//               {/* LEFT */}

//               <div>

//                 {/* Badge */}

//                 <div
//                   className="
//                     inline-flex
//                     items-center
//                     gap-2.5
//                     px-4
//                     py-2
//                     rounded-full
//                     bg-white/10
//                     border
//                     border-white/20
//                     backdrop-blur-sm
//                     text-sm
//                     font-semibold
//                   "
//                 >
//                   <span
//                     className="
//                       flex
//                       h-7
//                       w-7
//                       items-center
//                       justify-center
//                       rounded-full
//                       bg-white/15
//                     "
//                   >
//                     <UsersIcon
//                       className="
//                         h-4
//                         w-4
//                       "
//                     />
//                   </span>

//                   Worldwide Network
//                 </div>

//                 {/* Heading */}

//                 <h1
//                   className="
//                     mt-6
//                     text-4xl
//                     sm:text-5xl
//                     lg:text-6xl
//                     xl:text-[64px]
//                     font-bold
//                     tracking-tight
//                     leading-[1.04]
//                   "
//                 >
//                   Our Worldwide

//                   <span
//                     className="
//                       block
//                       text-[#AFC0FF]
//                     "
//                   >
//                     Distributors
//                   </span>
//                 </h1>

//                 {/* Description */}

//                 <p
//                   className="
//                     mt-6
//                     max-w-2xl
//                     text-base
//                     sm:text-lg
//                     leading-7
//                     sm:leading-8
//                     text-white/80
//                   "
//                 >
//                   Connect with our trusted
//                   distribution partners around
//                   the world for expert support,
//                   product information and
//                   contamination control
//                   solutions.
//                 </p>

//                 {/* Stats */}

//                 <div
//                   className="
//                     mt-8
//                     flex
//                     flex-wrap
//                     gap-4
//                   "
//                 >

//                   {/* Count */}

//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       gap-3
//                       rounded-2xl
//                       bg-white/10
//                       border
//                       border-white/15
//                       px-5
//                       py-3
//                     "
//                   >
//                     <div
//                       className="
//                         flex
//                         h-10
//                         w-10
//                         items-center
//                         justify-center
//                         rounded-xl
//                         bg-white
//                         text-[#173DB8]
//                       "
//                     >
//                       <UsersIcon
//                         className="
//                           h-5
//                           w-5
//                         "
//                       />
//                     </div>

//                     <div>
//                       <p
//                         className="
//                           text-xl
//                           font-bold
//                         "
//                       >
//                         {
//                           distributors.length
//                         }
//                       </p>

//                       <p
//                         className="
//                           text-xs
//                           text-white/60
//                         "
//                       >
//                         Distribution Partners
//                       </p>
//                     </div>
//                   </div>

//                   {/* Worldwide */}

//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       gap-3
//                       rounded-2xl
//                       bg-white/10
//                       border
//                       border-white/15
//                       px-5
//                       py-3
//                     "
//                   >
//                     <div
//                       className="
//                         flex
//                         h-10
//                         w-10
//                         items-center
//                         justify-center
//                         rounded-xl
//                         bg-white
//                         text-[#173DB8]
//                       "
//                     >
//                       <GlobeAltIcon
//                         className="
//                           h-5
//                           w-5
//                         "
//                       />
//                     </div>

//                     <div>
//                       <p
//                         className="
//                           text-xl
//                           font-bold
//                         "
//                       >
//                         Worldwide
//                       </p>

//                       <p
//                         className="
//                           text-xs
//                           text-white/60
//                         "
//                       >
//                         International Coverage
//                       </p>
//                     </div>
//                   </div>

//                 </div>
//               </div>

//               {/* GLOBE */}

//               <div
//                 className="
//                   flex
//                   flex-1
//                   items-center
//                   justify-end
//                   overflow-visible
//                 "
//               >
//                 <Globe />
//               </div>

//             </div>
//           </div>
//         </section>


//         {/* =================================================
//             SEARCH / FILTER
//         ================================================= */}

//         <section
//           className="
//             relative
//             z-10
//             mt-8
//             px-5
//             sm:px-8
//             lg:px-12
//           "
//         >
//           <div
//             className="
//               mx-auto
//               max-w-7xl
//               rounded-3xl
//               border
//               border-[#DDE3F2]
//               bg-white
//               p-5
//               shadow-xl
//               sm:p-7
//             "
//           >
//             <div
//               className="
//                 grid
//                 grid-cols-1
//                 gap-4
//                 lg:grid-cols-[1fr_240px]
//               "
//             >

//               {/* SEARCH */}

//               <div>
//                 <label
//                   className="
//                     mb-2
//                     block
//                     text-sm
//                     font-semibold
//                     text-[#30343B]
//                   "
//                 >
//                   Search distributors
//                 </label>

//                 <div
//                   className="
//                     relative
//                   "
//                 >
//                   <MagnifyingGlassIcon
//                     className="
//                       absolute
//                       left-4
//                       top-1/2
//                       h-5
//                       w-5
//                       -translate-y-1/2
//                       text-[#173DB8]
//                     "
//                   />

//                   <input
//                     type="text"
//                     value={search}
//                     onChange={(event) =>
//                       setSearch(
//                         event.target.value
//                       )
//                     }
//                     placeholder="
//                       Search by company, country,
//                       city or region...
//                     "
//                     className="
//                       h-12
//                       w-full
//                       rounded-xl
//                       border
//                       border-[#D8DFEF]
//                       bg-white
//                       pl-11
//                       pr-4
//                       text-sm
//                       text-[#30343B]
//                       outline-none
//                       transition
//                       placeholder:text-[#9AA1AE]
//                       focus:border-[#173DB8]
//                       focus:ring-4
//                       focus:ring-[#173DB8]/10
//                     "
//                   />
//                 </div>
//               </div>

//               {/* REGION */}

//               <div>
//                 <label
//                   className="
//                     mb-2
//                     block
//                     text-sm
//                     font-semibold
//                     text-[#30343B]
//                   "
//                 >
//                   Region
//                 </label>

//                 <div
//                   className="
//                     relative
//                   "
//                 >
//                   <select
//                     value={
//                       selectedRegion
//                     }
//                     onChange={(event) =>
//                       setSelectedRegion(
//                         event.target.value
//                       )
//                     }
//                     className="
//                       h-12
//                       w-full
//                       appearance-none
//                       rounded-xl
//                       border
//                       border-[#D8DFEF]
//                       bg-white
//                       px-4
//                       pr-10
//                       text-sm
//                       text-[#30343B]
//                       outline-none
//                       focus:border-[#173DB8]
//                       focus:ring-4
//                       focus:ring-[#173DB8]/10
//                     "
//                   >
//                     {regions.map(
//                       (region) => (
//                         <option
//                           key={region}
//                           value={region}
//                         >
//                           {region}
//                         </option>
//                       )
//                     )}
//                   </select>

//                   <ChevronDownIcon
//                     className="
//                       pointer-events-none
//                       absolute
//                       right-4
//                       top-1/2
//                       h-5
//                       w-5
//                       -translate-y-1/2
//                       text-[#7B8494]
//                     "
//                   />
//                 </div>
//               </div>

//             </div>
//           </div>
//         </section>


//         {/* =================================================
//             DISTRIBUTORS
//         ================================================= */}

//         <section
//           className="
//             px-5
//             py-14
//             sm:px-8
//             lg:px-12
//             lg:py-20
//           "
//         >
//           <div
//             className="
//               mx-auto
//               max-w-7xl
//             "
//           >

//             {/* SECTION HEADER */}

//             <div
//               className="
//                 mb-8
//                 flex
//                 flex-col
//                 gap-3
//                 sm:flex-row
//                 sm:items-end
//                 sm:justify-between
//               "
//             >
//               <div>

//                 <p
//                   className="
//                     text-sm
//                     font-bold
//                     uppercase
//                     tracking-[0.16em]
//                     text-[#173DB8]
//                   "
//                 >
//                   Global
//                 </p>

//                 <h2
//                   className="
//                     mt-2
//                     text-3xl
//                     font-bold
//                     tracking-tight
//                     text-[#151515]
//                   "
//                 >
//                   Our Distributor Network
//                 </h2>

//               </div>

//               {!isLoading &&
//                 !isError && (
//                   <div
//                     className="
//                       inline-flex
//                       items-center
//                       gap-2
//                       text-sm
//                       font-medium
//                       text-[#606673]
//                     "
//                   >
//                     <BuildingOffice2Icon
//                       className="
//                         h-5
//                         w-5
//                         text-[#173DB8]
//                       "
//                     />

//                     {
//                       filteredDistributors.length
//                     }{" "}
//                     distributor
//                     {filteredDistributors.length !==
//                     1
//                       ? "s"
//                       : ""}
//                   </div>
//                 )}
//             </div>


//             {/* =================================================
//                 LOADING
//             ================================================= */}

//             {isLoading && (
//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-6
//                   md:grid-cols-2
//                   xl:grid-cols-3
//                 "
//               >
//                 {Array.from({
//                   length: 6,
//                 }).map(
//                   (_, index) => (
//                     <div
//                       key={index}
//                       className="
//                         min-h-[390px]
//                         animate-pulse
//                         rounded-3xl
//                         border
//                         border-[#DDE3F2]
//                         bg-white
//                       "
//                     >
//                       <div
//                         className="
//                           h-1.5
//                           rounded-t-3xl
//                           bg-[#EAF0FF]
//                         "
//                       />

//                       <div
//                         className="
//                           p-6
//                         "
//                       >
//                         <div
//                           className="
//                             h-7
//                             w-32
//                             rounded
//                             bg-[#EEF1F6]
//                           "
//                         />

//                         <div
//                           className="
//                             mt-5
//                             h-8
//                             w-3/4
//                             rounded
//                             bg-[#EEF1F6]
//                           "
//                         />

//                         <div
//                           className="
//                             mt-8
//                             space-y-5
//                           "
//                         >
//                           <div
//                             className="
//                               h-12
//                               rounded
//                               bg-[#F4F6F9]
//                             "
//                           />

//                           <div
//                             className="
//                               h-12
//                               rounded
//                               bg-[#F4F6F9]
//                             "
//                           />

//                           <div
//                             className="
//                               h-12
//                               rounded
//                               bg-[#F4F6F9]
//                             "
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             )}


//             {/* =================================================
//                 API ERROR
//             ================================================= */}

//             {!isLoading &&
//               isError && (
//                 <div
//                   className="
//                     rounded-3xl
//                     border
//                     border-[#DDE3F2]
//                     bg-white
//                     px-6
//                     py-16
//                     text-center
//                     shadow-sm
//                   "
//                 >
//                   <div
//                     className="
//                       mx-auto
//                       flex
//                       h-16
//                       w-16
//                       items-center
//                       justify-center
//                       rounded-2xl
//                       bg-[#EAF0FF]
//                       text-[#173DB8]
//                     "
//                   >
//                     <BuildingOffice2Icon
//                       className="
//                         h-8
//                         w-8
//                       "
//                     />
//                   </div>

//                   <h2
//                     className="
//                       mt-6
//                       text-2xl
//                       font-bold
//                       text-[#151515]
//                     "
//                   >
//                     Distributor information
//                     unavailable
//                   </h2>

//                   <p
//                     className="
//                       mx-auto
//                       mt-3
//                       max-w-xl
//                       text-sm
//                       leading-6
//                       text-[#606673]
//                     "
//                   >
//                     We could not load
//                     distributor information
//                     at this time. Please try
//                     again later.
//                   </p>
//                 </div>
//               )}


//             {/* =================================================
//                 EMPTY API
//             ================================================= */}

//             {!isLoading &&
//               !isError &&
//               distributors.length ===
//                 0 && (
//                 <div
//                   className="
//                     rounded-3xl
//                     border
//                     border-[#DDE3F2]
//                     bg-white
//                     px-6
//                     py-16
//                     text-center
//                     shadow-sm
//                   "
//                 >
//                   <div
//                     className="
//                       mx-auto
//                       flex
//                       h-16
//                       w-16
//                       items-center
//                       justify-center
//                       rounded-2xl
//                       bg-[#EAF0FF]
//                       text-[#173DB8]
//                     "
//                   >
//                     <BuildingOffice2Icon
//                       className="
//                         h-8
//                         w-8
//                       "
//                     />
//                   </div>

//                   <h2
//                     className="
//                       mt-6
//                       text-2xl
//                       font-bold
//                       text-[#151515]
//                     "
//                   >
//                     No Distributor Information
//                     Available
//                   </h2>

//                   <p
//                     className="
//                       mx-auto
//                       mt-3
//                       max-w-xl
//                       text-sm
//                       leading-6
//                       text-[#606673]
//                     "
//                   >
//                     Distributor information
//                     will appear here once it
//                     is added from the admin
//                     panel.
//                   </p>
//                 </div>
//               )}


//             {/* =================================================
//                 NO SEARCH RESULTS
//             ================================================= */}

//             {!isLoading &&
//               !isError &&
//               distributors.length >
//                 0 &&
//               filteredDistributors.length ===
//                 0 && (
//                 <div
//                   className="
//                     rounded-3xl
//                     border
//                     border-[#DDE3F2]
//                     bg-white
//                     px-6
//                     py-16
//                     text-center
//                     shadow-sm
//                   "
//                 >
//                   <div
//                     className="
//                       mx-auto
//                       flex
//                       h-16
//                       w-16
//                       items-center
//                       justify-center
//                       rounded-2xl
//                       bg-[#EAF0FF]
//                       text-[#173DB8]
//                     "
//                   >
//                     <MagnifyingGlassIcon
//                       className="
//                         h-8
//                         w-8
//                       "
//                     />
//                   </div>

//                   <h2
//                     className="
//                       mt-6
//                       text-2xl
//                       font-bold
//                       text-[#151515]
//                     "
//                   >
//                     No Distributors Found
//                   </h2>

//                   <p
//                     className="
//                       mx-auto
//                       mt-3
//                       max-w-xl
//                       text-sm
//                       leading-6
//                       text-[#606673]
//                     "
//                   >
//                     Try changing your search
//                     term or selecting another
//                     region.
//                   </p>
//                 </div>
//               )}


//             {/* =================================================
//                 CARDS
//             ================================================= */}

//             {!isLoading &&
//               !isError &&
//               filteredDistributors.length >
//                 0 && (
//                 <div
//                   className="
//                     grid
//                     grid-cols-1
//                     gap-6
//                     md:grid-cols-2
//                     xl:grid-cols-3
//                   "
//                 >
//                   {filteredDistributors.map(
//                     (
//                       distributor,
//                       index
//                     ) => (
//                       <DistributorCard
//                         key={
//                           distributor.id ||
//                           index
//                         }
//                         distributor={
//                           distributor
//                         }
//                       />
//                     )
//                   )}
//                 </div>
//               )}


//             {/* =================================================
//                 VERIFIED INFORMATION
//             ================================================= */}

//             {!isLoading &&
//               !isError &&
//               distributors.length >
//                 0 && (
//                 <div
//                   className="
//                     mt-8
//                     flex
//                     items-start
//                     gap-3
//                     rounded-2xl
//                     border
//                     border-[#DDE3F2]
//                     bg-white
//                     px-4
//                     py-4
//                     shadow-sm
//                   "
//                 >
//                   <CheckCircleIcon
//                     className="
//                       mt-0.5
//                       h-5
//                       w-5
//                       shrink-0
//                       text-[#173DB8]
//                     "
//                   />

//                   <p
//                     className="
//                       text-sm
//                       leading-6
//                       text-[#606673]
//                     "
//                   >
//                     Showing the verified
//                     distributor information
//                     provided by Global.
//                   </p>
//                 </div>
//               )}

//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }


// // ======================================================
// // DISTRIBUTOR CARD
// // ======================================================

// function DistributorCard({
//   distributor,
// }) {
//  const {
//   companyName,
//   country,
//   region,
//   location,
//   emails = [],
//   phone,
//   phoneDisplay,
//   website,
// } = distributor;

//   const websiteUrl =
//     getWebsiteUrl(
//       website
//     );

//   const phoneHref =
//     phone
//       ? `tel:${String(phone).replace(
//           /[^\d+]/g,
//           ""
//         )}`
//       : "";

//   // ====================================================
//   // DISPLAY VALUES
//   // ====================================================

//   const displayRegion =
//     region || "Global";

//   const displayCountry =
//     country ||
//     "Country not specified";

//   const displayLocation =
//     location ||
//     "Location not available";

//   const hasPhone =
//     Boolean(phone);

//   const hasEmails =
//     Array.isArray(emails) &&
//     emails.length > 0;

//   const hasWebsite =
//     Boolean(website);

//   return (
//     <article
//       className="
//         group
//         relative
//         flex
//         h-full
//         min-h-[390px]
//         flex-col
//         overflow-hidden
//         rounded-3xl
//         border
//         border-[#DDE3F2]
//         bg-white
//         shadow-sm
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:border-[#BFCBEB]
//         hover:shadow-xl
//       "
//     >

//       {/* ==================================================
//           BLUE TOP BORDER
//       ================================================== */}

//       <div
//         className="
//           h-1.5
//           w-full
//           bg-[#173DB8]
//         "
//       />


//       {/* ==================================================
//           CARD BODY
//       ================================================== */}

//       <div
//         className="
//           flex
//           flex-1
//           flex-col
//           p-6
//         "
//       >

//         {/* =================================================
//             COUNTRY / REGION
//         ================================================= */}

//         <div
//           className="
//             flex
//             items-center
//             gap-3
//           "
//         >
// <ManualFlag countryCode={countryCode} />

//           <div
//             className="
//               min-w-0
//             "
//           >
//             <p
//               className="
//                 text-xs
//                 font-semibold
//                 uppercase
//                 tracking-[0.12em]
//                 text-[#173DB8]
//               "
//             >
//               {displayRegion}
//             </p>

//             <p
//               className="
//                 mt-1
//                 text-sm
//                 font-medium
//                 text-[#606673]
//               "
//             >
//               {displayCountry}
//             </p>
//           </div>

//         </div>


//         {/* =================================================
//             COMPANY
//         ================================================= */}

//         <h2
//           className="
//             mt-5
//             text-xl
//             font-bold
//             leading-7
//             text-[#151515]
//           "
//         >
//           {
//             companyName ||
//             "Distributor name unavailable"
//           }
//         </h2>


//         {/* =================================================
//             LOCATION
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >

//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <MapPinIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div
//             className="
//               min-w-0
//             "
//           >
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Location
//             </p>

//             {location ? (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   text-[#606673]
//                 "
//               >
//                 {location}
//               </p>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 {displayLocation}
//               </p>
//             )}
//           </div>

//         </div>


//         {/* =================================================
//             PHONE
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >

//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <PhoneIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div
//             className="
//               min-w-0
//             "
//           >
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Phone
//             </p>

//             {hasPhone ? (
//               <a
//                 href={phoneHref}
//                 className="
//                   mt-1
//                   block
//                   break-words
//                   text-sm
//                   leading-6
//                   text-[#606673]
//                   transition
//                   hover:text-[#173DB8]
//                 "
//               >
//                 {phoneDisplay ||
//                   phone}
//               </a>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Phone number not available
//               </p>
//             )}
//           </div>

//         </div>


//         {/* =================================================
//             EMAILS
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >

//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <EnvelopeIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div
//             className="
//               min-w-0
//             "
//           >
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Email
//             </p>

//             {hasEmails ? (
//               <div
//                 className="
//                   mt-1
//                   space-y-1
//                 "
//               >
//                 {emails.map(
//                   (
//                     email,
//                     index
//                   ) => (
//                     <a
//                       key={`${email}-${index}`}
//                       href={`mailto:${email}`}
//                       className="
//                         block
//                         break-all
//                         text-sm
//                         leading-6
//                         text-[#606673]
//                         transition
//                         hover:text-[#173DB8]
//                       "
//                     >
//                       {email}
//                     </a>
//                   )
//                 )}
//               </div>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Email address not available
//               </p>
//             )}
//           </div>

//         </div>


//         {/* =================================================
//             WEBSITE
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >

//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <GlobeAltIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div
//             className="
//               min-w-0
//             "
//           >
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Website
//             </p>

//             {hasWebsite ? (
//               <a
//                 href={websiteUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="
//                   mt-1
//                   flex
//                   items-center
//                   gap-1.5
//                   break-all
//                   text-sm
//                   leading-6
//                   text-[#173DB8]
//                   transition
//                   hover:underline
//                 "
//               >
//                 {website}

//                 <ArrowTopRightOnSquareIcon
//                   className="
//                     h-4
//                     w-4
//                     shrink-0
//                   "
//                 />
//               </a>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Website not available
//               </p>
//             )}
//           </div>

//         </div>

//       </div>
//     </article>
//   );
// }
//   // ======================================================
//   // REGION DETECTION
//   // ======================================================

//   function detectRegion(country = "") {
//     const value =
//       String(country).toLowerCase();

//     // ----------------------------------------------------
//     // EUROPE
//     // ----------------------------------------------------

//     if (
//       [
//         "ireland",
//         "united kingdom",
//         "germany",
//         "czech",
//         "spain",
//         "romania",
//         "finland",
//         "france",
//         "italy",
//         "netherlands",
//         "belgium",
//         "poland",
//         "sweden",
//         "norway",
//         "denmark",
//       ].some((item) =>
//         value.includes(item)
//       )
//     ) {
//       return "Europe";
//     }

//     // ----------------------------------------------------
//     // ASIA
//     // ----------------------------------------------------

//     if (
//       [
//         "india",
//         "malaysia",
//         "singapore",
//         "china",
//         "japan",
//         "korea",
//         "indonesia",
//         "thailand",
//         "vietnam",
//       ].some((item) =>
//         value.includes(item)
//       )
//     ) {
//       return "Asia";
//     }

//     // ----------------------------------------------------
//     // AFRICA
//     // ----------------------------------------------------

//     if (
//       [
//         "south africa",
//         "africa",
//         "nigeria",
//         "kenya",
//         "egypt",
//       ].some((item) =>
//         value.includes(item)
//       )
//     ) {
//       return "Africa";
//     }

//     // ----------------------------------------------------
//     // NORTH AMERICA
//     // ----------------------------------------------------

//     if (
//       [
//         "united states",
//         "usa",
//         "america",
//         "mexico",
//         "costa rica",
//         "canada",
//       ].some((item) =>
//         value.includes(item)
//       )
//     ) {
//       return "North America";
//     }

//     return "Other";
//   }

//   // ======================================================
//   // WEBSITE URL
//   // ======================================================

//   function getWebsiteUrl(
//     website = ""
//   ) {
//     if (!website) {
//       return "";
//     }

//     if (
//       website.startsWith(
//         "http://"
//       ) ||
//       website.startsWith(
//         "https://"
//       )
//     ) {
//       return website;
//     }

//     return `https://${website}`;
//   }

//   // ======================================================
//   // NORMALIZE DISTRIBUTOR
//   // ======================================================

//   function normalizeDistributor(
//     item,
//     index
//   ) {
//     if (!item) {
//       return null;
//     }

//     // ----------------------------------------------------
//     // COUNTRY
//     // ----------------------------------------------------

//     const country =
//       item.country ||
//       "International";

//     // ----------------------------------------------------
//     // COMPANY
//     // ----------------------------------------------------

//     const companyName =
//       item.companyName ||
//       item.company ||
//       item.name ||
//       "";

//     if (!companyName.trim()) {
//       return null;
//     }

//     // ----------------------------------------------------
//     // EMAILS
//     // ----------------------------------------------------

//     let emails = [];

//     if (
//       Array.isArray(item.emails)
//     ) {
//       emails = item.emails
//         .map((email) =>
//           String(email).trim()
//         )
//         .filter(Boolean);
//     } else if (
//       typeof item.emails ===
//       "string"
//     ) {
//       emails = item.emails
//         .split(
//           /[,;|]/
//         )
//         .map((email) =>
//           email.trim()
//         )
//         .filter(Boolean);
//     } else if (
//       item.email
//     ) {
//       emails = [
//         String(item.email).trim(),
//       ].filter(Boolean);
//     }

//     // ----------------------------------------------------
//     // LOCATION
//     // ----------------------------------------------------

//     let location = "";

//     if (
//       typeof item.location ===
//       "string"
//     ) {
//       location =
//         item.location.trim();
//     } else {
//       location = [
//         item.city,
//         item.state ||
//           item.stateProvince ||
//           item.province,
//         country,
//         item.postalCode ||
//           item.zipCode ||
//           item.zip,
//       ]
//         .filter(Boolean)
//         .join(", ");
//     }

//     // ----------------------------------------------------
//     // WEBSITE
//     // ----------------------------------------------------

//     const website =
//       item.website ||
//       item.websiteUrl ||
//       item.url ||
//       "";

//     // ----------------------------------------------------
//     // PHONE
//     // ----------------------------------------------------

//     const phone =
//       item.phone ||
//       item.phoneNumber ||
//       "";

//     // ----------------------------------------------------
//     // REGION
//     // ----------------------------------------------------

//     const region =
//       item.region ||
//       item.continent ||
//       detectRegion(country);

//     // ----------------------------------------------------
//     // FLAG
//     // ----------------------------------------------------

// const flag = normalizeCountryCode(country);

//     // ----------------------------------------------------
//     // RETURN
//     // ----------------------------------------------------

//     return {
//       id:
//         item._id ||
//         item.id ||
//         `admin-distributor-${index}`,

//       companyName:
//         companyName.trim(),

//       country,

//       region,

//       location,

//       city:
//         item.city || "",

//       state:
//         item.state ||
//         item.stateProvince ||
//         item.province ||
//         "",

//       postalCode:
//         item.postalCode ||
//         item.zipCode ||
//         item.zip ||
//         "",

//       emails,

//       phone,

//       phoneDisplay:
//         item.phoneDisplay ||
//         phone ||
//         "N/A",

//       website,

//       flag,

//       status:
//         item.status ||
//         "Active",

//       sortOrder:
//         Number.isFinite(
//           Number(item.sortOrder)
//         )
//           ? Number(item.sortOrder)
//           : 0,
//     };
//   }

//   // ======================================================
//   // MAIN COMPONENT
//   // ======================================================

//   export default function DistributorPage() {
//     const api = useApiClient();

//     const [search, setSearch] =
//       useState("");

//     const [
//       selectedRegion,
//       setSelectedRegion,
//     ] = useState("All Regions");

//     // ====================================================
//     // ADMIN API
//     // ====================================================

//     const distributorsQuery =
//       api.useGet(
//         "distributors",
//         "/distributors"
//       );

//     // ====================================================
//     // GET API DATA
//     // ====================================================

//     const distributors =
//       useMemo(() => {
//         const response =
//           distributorsQuery?.data;

//         if (!response) {
//           return [];
//         }

//         let data = [];

//         // -----------------------------------------------
//         // API:
//         // { success: true, data: [...] }
//         // -----------------------------------------------

//         if (
//           Array.isArray(
//             response?.data
//           )
//         ) {
//           data = response.data;
//         }

//         // -----------------------------------------------
//         // Direct array
//         // -----------------------------------------------

//         else if (
//           Array.isArray(response)
//         ) {
//           data = response;
//         }

//         // -----------------------------------------------
//         // { distributors: [...] }
//         // -----------------------------------------------

//         else if (
//           Array.isArray(
//             response?.distributors
//           )
//         ) {
//           data =
//             response.distributors;
//         }

//         // -----------------------------------------------
//         // { data: { distributors: [...] } }
//         // -----------------------------------------------

//         else if (
//           Array.isArray(
//             response?.data
//               ?.distributors
//           )
//         ) {
//           data =
//             response.data
//               .distributors;
//         }

//         // -----------------------------------------------
//         // { results: [...] }
//         // -----------------------------------------------

//         else if (
//           Array.isArray(
//             response?.results
//           )
//         ) {
//           data = response.results;
//         }

//         return data
//           .map(
//             normalizeDistributor
//           )
//           .filter(Boolean)
//           .filter(
//             (item) =>
//               item.status !==
//               "Inactive"
//           );
//       }, [
//         distributorsQuery?.data,
//       ]);

//     // ====================================================
//     // REGIONS
//     // ====================================================

//     const regions =
//       useMemo(() => {
//         const regionList =
//           distributors
//             .map(
//               (item) =>
//                 item.region
//             )
//             .filter(Boolean);

//         return [
//           "All Regions",
//           ...Array.from(
//             new Set(regionList)
//           ).sort(),
//         ];
//       }, [distributors]);

//     // ====================================================
//     // FILTERED DISTRIBUTORS
//     // ====================================================

//     const filteredDistributors =
//       useMemo(() => {
//         const searchValue =
//           search
//             .trim()
//             .toLowerCase();

//         return distributors.filter(
//           (distributor) => {
//             const searchableText = [
//               distributor.companyName,
//               distributor.country,
//               distributor.region,
//               distributor.location,
//               distributor.city,
//               distributor.state,
//               distributor.postalCode,
//               distributor.phone,
//               ...(distributor.emails ||
//                 []),
//               distributor.website,
//             ]
//               .filter(Boolean)
//               .join(" ")
//               .toLowerCase();

//             const matchesSearch =
//               !searchValue ||
//               searchableText.includes(
//                 searchValue
//               );

//             const matchesRegion =
//               selectedRegion ===
//                 "All Regions" ||
//               distributor.region ===
//                 selectedRegion;

//             return (
//               matchesSearch &&
//               matchesRegion
//             );
//           }
//         );
//       }, [
//         distributors,
//         search,
//         selectedRegion,
//       ]);

//     // ====================================================
//     // LOADING
//     // ====================================================

//     const isLoading =
//       distributorsQuery?.isLoading ||
//       distributorsQuery?.isPending;

//     // ====================================================
//     // ERROR
//     // ====================================================

//     const isError =
//       distributorsQuery?.isError;

//     // ====================================================
//     // UI
//     // ====================================================

//     return (
      
//       <>
//   <Header/>
//         <main
//           className="
//             min-h-screen
//             bg-[#F7F9FC]
//           "
//         >
//           {/* =================================================
//               HERO
//           ================================================= */}

//       <section
//     className="
//       relative
//       overflow-hidden
//       bg-[#173DB8]
//       text-white
//     "
//   >
//     {/* Background */}

//     <div
//       className="
//         absolute
//         inset-0
//         pointer-events-none
//         opacity-[0.055]
//         bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
//         bg-[size:60px_60px]
//       "
//     />

//     <div
//       className="
//         absolute
//         -top-40
//         -right-40
//         h-96
//         w-96
//         rounded-full
//         bg-[#6E8BFF]/20
//         blur-3xl
//         pointer-events-none
//       "
//     />

//     <div
//       className="
//         absolute
//         -bottom-48
//         -left-40
//         h-96
//         w-96
//         rounded-full
//         bg-white/10
//         blur-3xl
//         pointer-events-none
//       "
//     />

//     {/* Content */}

//     <div
//       className="
//         relative
//         max-w-7xl
//         mx-auto
//         px-5
//         sm:px-8
//         py-14
//         sm:py-16
//         lg:py-20
//       "
//     >
//       <div
//         className="
//           grid
//           lg:grid-cols-[1.2fr_0.8fr]
//           gap-20
//           lg:gap-16
//           items-center
//         "
//       >
//         {/* LEFT */}

//         <div>
//           {/* Badge */}

//           <div
//             className="
//               inline-flex
//               items-center
//               gap-2.5
//               px-4
//               py-2
//               rounded-full
//               bg-white/10
//               border
//               border-white/20
//               backdrop-blur-sm
//               text-sm
//               font-semibold
//             "
//           >
//             <span
//               className="
//                 flex
//                 h-7
//                 w-7
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-white/15
//               "
//             >
//               <UsersIcon className="h-4 w-4" />
//             </span>

//             Worldwide Network
//           </div>

//           {/* Heading */}

//           <h1
//             className="
//               mt-6
//               text-4xl
//               sm:text-5xl
//               lg:text-6xl
//               xl:text-[64px]
//               font-bold
//               tracking-tight
//               leading-[1.04]
//             "
//           >
//             Our Worldwide

//             <span
//               className="
//                 block
//                 text-[#AFC0FF]
//               "
//             >
//               Distributors
//             </span>
//           </h1>

//           {/* Description */}

//           <p
//             className="
//               mt-6
//               max-w-2xl
//               text-base
//               sm:text-lg
//               leading-7
//               sm:leading-8
//               text-white/80
//             "
//           >
//             Connect with our trusted
//             distribution partners around
//             the world for expert support,
//             product information and
//             contamination control
//             solutions.
//           </p>

//           {/* Stats */}

//           <div
//             className="
//               mt-8
//               flex
//               flex-wrap
//               gap-4
//             "
//           >
//             {/* Count */}

//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-3
//                 rounded-2xl
//                 bg-white/10
//                 border
//                 border-white/15
//                 px-5
//                 py-3
//               "
//             >
//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-xl
//                   bg-white
//                   text-[#173DB8]
//                 "
//               >
//                 <UsersIcon className="h-5 w-5" />
//               </div>

//               <div>
//                 <p className="text-xl font-bold">
//                   {distributors.length}
//                 </p>

//                 <p className="text-xs text-white/60">
//                   Distribution Partners
//                 </p>
//               </div>
//             </div>

//             {/* Worldwide */}

//             <div
//               className="
//                 inline-flex
//                 items-center
//                 gap-3
//                 rounded-2xl
//                 bg-white/10
//                 border
//                 border-white/15
//                 px-5
//                 py-3
//               "
//             >
//               <div
//                 className="
//                   flex
//                   h-10
//                   w-10
//                   items-center
//                   justify-center
//                   rounded-xl
//                   bg-white
//                   text-[#173DB8]
//                 "
//               >
//                 <GlobeAltIcon className="h-5 w-5" />
//               </div>

//               <div>
//                 <p className="text-xl font-bold">
//                   Worldwide
//                 </p>

//                 <p className="text-xs text-white/60">
//                   International Coverage
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

// <div className="flex-1 flex items-center justify-end overflow-visible">
//   <Globe />
// </div>

//       </div>
//     </div>
//   </section>



//           {/* =================================================
//               SEARCH / FILTER
//           ================================================= */}

//           <section
//             className="
//               relative
//               z-10
//               mt-8
//               px-5
//               sm:px-8
//               lg:px-12
//             "
//           >
//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//                 rounded-3xl
//                 border
//                 border-[#DDE3F2]
//                 bg-white
//                 p-5
//                 shadow-xl
//                 sm:p-7
//               "
//             >
//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   gap-4
//                   lg:grid-cols-[1fr_240px]
//                 "
//               >
//                 {/* SEARCH */}

//                 <div>
//                   <label
//                     className="
//                       mb-2
//                       block
//                       text-sm
//                       font-semibold
//                       text-[#30343B]
//                     "
//                   >
//                     Search distributors
//                   </label>

//                   <div className="relative">
//                     <MagnifyingGlassIcon
//                       className="
//                         absolute
//                         left-4
//                         top-1/2
//                         h-5
//                         w-5
//                         -translate-y-1/2
//                         text-[#173DB8]
//                       "
//                     />

//                     <input
//                       type="text"
//                       value={search}
//                       onChange={(event) =>
//                         setSearch(
//                           event.target.value
//                         )
//                       }
//                       placeholder="Search by company, country, city or region..."
//                       className="
//                         h-12
//                         w-full
//                         rounded-xl
//                         border
//                         border-[#D8DFEF]
//                         bg-white
//                         pl-11
//                         pr-4
//                         text-sm
//                         text-[#30343B]
//                         outline-none
//                         transition
//                         placeholder:text-[#9AA1AE]
//                         focus:border-[#173DB8]
//                         focus:ring-4
//                         focus:ring-[#173DB8]/10
//                       "
//                     />
//                   </div>
//                 </div>

//                 {/* REGION */}

//                 <div>
//                   <label
//                     className="
//                       mb-2
//                       block
//                       text-sm
//                       font-semibold
//                       text-[#30343B]
//                     "
//                   >
//                     Region
//                   </label>

//                   <div className="relative">
//                     <select
//                       value={
//                         selectedRegion
//                       }
//                       onChange={(
//                         event
//                       ) =>
//                         setSelectedRegion(
//                           event.target
//                             .value
//                         )
//                       }
//                       className="
//                         h-12
//                         w-full
//                         appearance-none
//                         rounded-xl
//                         border
//                         border-[#D8DFEF]
//                         bg-white
//                         px-4
//                         pr-10
//                         text-sm
//                         text-[#30343B]
//                         outline-none
//                         focus:border-[#173DB8]
//                         focus:ring-4
//                         focus:ring-[#173DB8]/10
//                       "
//                     >
//                       {regions.map(
//                         (region) => (
//                           <option
//                             key={
//                               region
//                             }
//                             value={
//                               region
//                             }
//                           >
//                             {region}
//                           </option>
//                         )
//                       )}
//                     </select>

//                     <ChevronDownIcon
//                       className="
//                         pointer-events-none
//                         absolute
//                         right-4
//                         top-1/2
//                         h-5
//                         w-5
//                         -translate-y-1/2
//                         text-[#7B8494]
//                       "
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* =================================================
//               DISTRIBUTORS
//           ================================================= */}

//           <section
//             className="
//               px-5
//               py-14
//               sm:px-8
//               lg:px-12
//               lg:py-20
//             "
//           >
//             <div
//               className="
//                 mx-auto
//                 max-w-7xl
//               "
//             >
//               {/* SECTION HEADER */}

//               <div
//                 className="
//                   mb-8
//                   flex
//                   flex-col
//                   gap-3
//                   sm:flex-row
//                   sm:items-end
//                   sm:justify-between
//                 "
//               >
//                 <div>
//                   <p
//                     className="
//                       text-sm
//                       font-bold
//                       uppercase
//                       tracking-[0.16em]
//                       text-[#173DB8]
//                     "
//                   >
//                   Global
//                   </p>

//                   <h2
//                     className="
//                       mt-2
//                       text-3xl
//                       font-bold
//                       tracking-tight
//                       text-[#151515]
//                     "
//                   >
//                     Our Distributor Network
//                   </h2>
//                 </div>

//                 {!isLoading &&
//                   !isError && (
//                     <div
//                       className="
//                         inline-flex
//                         items-center
//                         gap-2
//                         text-sm
//                         font-medium
//                         text-[#606673]
//                       "
//                     >
//                       <BuildingOffice2Icon
//                         className="
//                           h-5
//                           w-5
//                           text-[#173DB8]
//                         "
//                       />

//                       {filteredDistributors.length}{" "}
//                       distributor
//                       {filteredDistributors.length !==
//                       1
//                         ? "s"
//                         : ""}
//                     </div>
//                   )}
//               </div>

//               {/* =================================================
//                   LOADING
//               ================================================= */}

//               {isLoading && (
//                 <div
//                   className="
//                     grid
//                     grid-cols-1
//                     gap-6
//                     md:grid-cols-2
//                     xl:grid-cols-3
//                   "
//                 >
//                   {Array.from({
//                     length: 6,
//                   }).map(
//                     (_, index) => (
//                       <div
//                         key={index}
//                         className="
//                           min-h-[390px]
//                           animate-pulse
//                           rounded-3xl
//                           border
//                           border-[#DDE3F2]
//                           bg-white
//                         "
//                       >
//                         <div className="h-1.5 rounded-t-3xl bg-[#EAF0FF]" />

//                         <div className="p-6">
//                           <div className="h-7 w-32 rounded bg-[#EEF1F6]" />

//                           <div className="mt-5 h-8 w-3/4 rounded bg-[#EEF1F6]" />

//                           <div className="mt-8 space-y-5">
//                             <div className="h-12 rounded bg-[#F4F6F9]" />
//                             <div className="h-12 rounded bg-[#F4F6F9]" />
//                             <div className="h-12 rounded bg-[#F4F6F9]" />
//                           </div>
//                         </div>
//                       </div>
//                     )
//                   )}
//                 </div>
//               )}

//               {/* =================================================
//                   API ERROR
//               ================================================= */}

//               {!isLoading &&
//                 isError && (
//                   <div
//                     className="
//                       rounded-3xl
//                       border
//                       border-[#DDE3F2]
//                       bg-white
//                       px-6
//                       py-16
//                       text-center
//                       shadow-sm
//                     "
//                   >
//                     <div
//                       className="
//                         mx-auto
//                         flex
//                         h-16
//                         w-16
//                         items-center
//                         justify-center
//                         rounded-2xl
//                         bg-[#EAF0FF]
//                         text-[#173DB8]
//                       "
//                     >
//                       <BuildingOffice2Icon
//                         className="
//                           h-8
//                           w-8
//                         "
//                       />
//                     </div>

//                     <h2
//                       className="
//                         mt-6
//                         text-2xl
//                         font-bold
//                         text-[#151515]
//                       "
//                     >
//                       Distributor information
//                       unavailable
//                     </h2>

//                     <p
//                       className="
//                         mx-auto
//                         mt-3
//                         max-w-xl
//                         text-sm
//                         leading-6
//                         text-[#606673]
//                       "
//                     >
//                       We could not load
//                       distributor information
//                       at this time. Please try
//                       again later.
//                     </p>
//                   </div>
//                 )}

//               {/* =================================================
//                   EMPTY API
//               ================================================= */}

//               {!isLoading &&
//                 !isError &&
//                 distributors.length ===
//                   0 && (
//                   <div
//                     className="
//                       rounded-3xl
//                       border
//                       border-[#DDE3F2]
//                       bg-white
//                       px-6
//                       py-16
//                       text-center
//                       shadow-sm
//                     "
//                   >
//                     <div
//                       className="
//                         mx-auto
//                         flex
//                         h-16
//                         w-16
//                         items-center
//                         justify-center
//                         rounded-2xl
//                         bg-[#EAF0FF]
//                         text-[#173DB8]
//                       "
//                     >
//                       <BuildingOffice2Icon
//                         className="
//                           h-8
//                           w-8
//                         "
//                       />
//                     </div>

//                     <h2
//                       className="
//                         mt-6
//                         text-2xl
//                         font-bold
//                         text-[#151515]
//                       "
//                     >
//                       No Distributor Information
//                       Available
//                     </h2>

//                     <p
//                       className="
//                         mx-auto
//                         mt-3
//                         max-w-xl
//                         text-sm
//                         leading-6
//                         text-[#606673]
//                       "
//                     >
//                       Distributor information
//                       will appear here once it
//                       is added from the admin
//                       panel.
//                     </p>
//                   </div>
//                 )}

//               {/* =================================================
//                   NO SEARCH RESULTS
//               ================================================= */}

//               {!isLoading &&
//                 !isError &&
//                 distributors.length >
//                   0 &&
//                 filteredDistributors.length ===
//                   0 && (
//                   <div
//                     className="
//                       rounded-3xl
//                       border
//                       border-[#DDE3F2]
//                       bg-white
//                       px-6
//                       py-16
//                       text-center
//                       shadow-sm
//                     "
//                   >
//                     <div
//                       className="
//                         mx-auto
//                         flex
//                         h-16
//                         w-16
//                         items-center
//                         justify-center
//                         rounded-2xl
//                         bg-[#EAF0FF]
//                         text-[#173DB8]
//                       "
//                     >
//                       <MagnifyingGlassIcon
//                         className="
//                           h-8
//                           w-8
//                         "
//                       />
//                     </div>

//                     <h2
//                       className="
//                         mt-6
//                         text-2xl
//                         font-bold
//                         text-[#151515]
//                       "
//                     >
//                       No Distributors Found
//                     </h2>

//                     <p
//                       className="
//                         mx-auto
//                         mt-3
//                         max-w-xl
//                         text-sm
//                         leading-6
//                         text-[#606673]
//                       "
//                     >
//                       Try changing your search
//                       term or selecting another
//                       region.
//                     </p>
//                   </div>
//                 )}

//               {/* =================================================
//                   CARDS
//               ================================================= */}

//               {!isLoading &&
//                 !isError &&
//                 filteredDistributors.length >
//                   0 && (
//                   <div
//                     className="
//                       grid
//                       grid-cols-1
//                       gap-6
//                       md:grid-cols-2
//                       xl:grid-cols-3
//                     "
//                   >
//                     {filteredDistributors.map(
//                       (
//                         distributor,
//                         index
//                       ) => (
//                         <DistributorCard
//                           key={
//                             distributor.id ||
//                             index
//                           }
//                           distributor={
//                             distributor
//                           }
//                         />
//                       )
//                     )}
//                   </div>
//                 )}

//               {/* =================================================
//                   VERIFIED INFORMATION
//               ================================================= */}

//               {!isLoading &&
//                 !isError &&
//                 distributors.length >
//                   0 && (
//                   <div
//                     className="
//                       mt-8
//                       flex
//                       items-start
//                       gap-3
//                       rounded-2xl
//                       border
//                       border-[#DDE3F2]
//                       bg-white
//                       px-4
//                       py-4
//                       shadow-sm
//                     "
//                   >
//                     <CheckCircleIcon
//                       className="
//                         mt-0.5
//                         h-5
//                         w-5
//                         shrink-0
//                         text-[#173DB8]
//                       "
//                     />

//                     <p
//                       className="
//                         text-sm
//                         leading-6
//                         text-[#606673]
//                       "
//                     >
//                       Showing the verified
//                       distributor information
//                       provided by Global.
//                     </p>
//                   </div>
//                 )}
//             </div>
//           </section>
//         </main>

//         <Footer />
//       </>
//     );
//   }

//   // ======================================================
//   // DISTRIBUTOR CARD
//   // ======================================================
// function DistributorCard({ distributor }) {
//   const {
//     companyName,
//     country,
//     region,
//     location,
//     emails = [],
//     phone,
//     phoneDisplay,
//     website,
//     flag,
//   } = distributor;

//   const websiteUrl = getWebsiteUrl(website);

//   const phoneHref = phone
//     ? `tel:${phone.replace(/[^\d+]/g, "")}`
//     : "";

//   // =========================================================
//   // PROFESSIONAL FALLBACK TEXT
//   // =========================================================

// const displayFlag =
//   normalizeCountryCode(country);
  
//   const displayRegion = region || "Global";
//   const displayCountry = country || "Country not specified";

//   const displayLocation =
//     location || "Location not available";

//   const hasPhone = Boolean(phone);
//   const hasEmails =
//     Array.isArray(emails) && emails.length > 0;
//   const hasWebsite = Boolean(website);

//   return (
//     <article
//       className="
//         group
//         relative
//         flex
//         h-full
//         min-h-[390px]
//         flex-col
//         overflow-hidden
//         rounded-3xl
//         border
//         border-[#DDE3F2]
//         bg-white
//         shadow-sm
//         transition-all
//         duration-300
//         hover:-translate-y-1
//         hover:border-[#BFCBEB]
//         hover:shadow-xl
//       "
//     >
//       {/* ==================================================
//           BLUE TOP BORDER
//       ================================================== */}

//       <div
//         className="
//           h-1.5
//           w-full
//           bg-[#173DB8]
//         "
//       />

//       {/* ==================================================
//           CARD BODY
//       ================================================== */}

//       <div
//         className="
//           flex
//           flex-1
//           flex-col
//           p-6
//         "
//       >
//         {/* =================================================
//             COUNTRY / REGION
//         ================================================= */}

//         <div className="flex items-center gap-3">
//        <span
//   className="
//     flex
//     h-11
//     w-11
//     shrink-0
//     items-center
//     justify-center
//     rounded-xl
//     bg-[#F3F6FF]
//   "
// >
//   <ManualFlag
//     countryCode={displayFlag}
//   />
// </span>

//           <div className="min-w-0">
//             <p
//               className="
//                 text-xs
//                 font-semibold
//                 uppercase
//                 tracking-[0.12em]
//                 text-[#173DB8]
//               "
//             >
//               {displayRegion}
//             </p>

//             <p
//               className="
//                 mt-1
//                 text-sm
//                 font-medium
//                 text-[#606673]
//               "
//             >
//               {displayCountry}
//             </p>
//           </div>
//         </div>

//         {/* =================================================
//             COMPANY
//         ================================================= */}

//         <h2
//           className="
//             mt-5
//             text-xl
//             font-bold
//             leading-7
//             text-[#151515]
//           "
//         >
//           {companyName || "Distributor name unavailable"}
//         </h2>

//         {/* =================================================
//             LOCATION
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >
//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <MapPinIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div className="min-w-0">
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Location
//             </p>

//             {location ? (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   text-[#606673]
//                 "
//               >
//                 {location}
//               </p>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Location not available
//               </p>
//             )}
//           </div>
//         </div>

//         {/* =================================================
//             PHONE
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >
//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <PhoneIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div className="min-w-0">
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Phone
//             </p>

//             {hasPhone ? (
//               <a
//                 href={phoneHref}
//                 className="
//                   mt-1
//                   block
//                   break-words
//                   text-sm
//                   leading-6
//                   text-[#606673]
//                   transition
//                   hover:text-[#173DB8]
//                 "
//               >
//                 {phoneDisplay || phone}
//               </a>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Phone number not available
//               </p>
//             )}
//           </div>
//         </div>

//         {/* =================================================
//             EMAILS
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >
//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <EnvelopeIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div className="min-w-0">
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Email
//             </p>

//             {hasEmails ? (
//               <div
//                 className="
//                   mt-1
//                   space-y-1
//                 "
//               >
//                 {emails.map(
//                   (email, index) => (
//                     <a
//                       key={`${email}-${index}`}
//                       href={`mailto:${email}`}
//                       className="
//                         block
//                         break-all
//                         text-sm
//                         leading-6
//                         text-[#606673]
//                         transition
//                         hover:text-[#173DB8]
//                       "
//                     >
//                       {email}
//                     </a>
//                   )
//                 )}
//               </div>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Email address not available
//               </p>
//             )}
//           </div>
//         </div>

//         {/* =================================================
//             WEBSITE
//         ================================================= */}

//         <div
//           className="
//             mt-5
//             flex
//             items-start
//             gap-3
//           "
//         >
//           <div
//             className="
//               flex
//               h-10
//               w-10
//               shrink-0
//               items-center
//               justify-center
//               rounded-xl
//               bg-[#EAF0FF]
//               text-[#173DB8]
//             "
//           >
//             <GlobeAltIcon
//               className="
//                 h-5
//                 w-5
//               "
//             />
//           </div>

//           <div className="min-w-0">
//             <p
//               className="
//                 text-xs
//                 font-bold
//                 uppercase
//                 tracking-wide
//                 text-[#8A909D]
//               "
//             >
//               Website
//             </p>

//             {hasWebsite ? (
//               <a
//                 href={websiteUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="
//                   mt-1
//                   flex
//                   items-center
//                   gap-1.5
//                   break-all
//                   text-sm
//                   leading-6
//                   text-[#173DB8]
//                   transition
//                   hover:underline
//                 "
//               >
//                 {website}

//                 <ArrowTopRightOnSquareIcon
//                   className="
//                     h-4
//                     w-4
//                     shrink-0
//                   "
//                 />
//               </a>
//             ) : (
//               <p
//                 className="
//                   mt-1
//                   text-sm
//                   leading-6
//                   italic
//                   text-[#9AA1AE]
//                 "
//               >
//                 Website not available
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

"use client";

import React, {
  useMemo,
  useState,
} from "react";

import {
  BuildingOffice2Icon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UsersIcon,
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { useApiClient } from "@/src/config/axios";
import Footer from "@/src/components/share/Footer";
import Header from "@/src/components/share/Header";
import Globe from "@/src/components/share/Glob";

// ======================================================
// COUNTRY CODE
// ======================================================

function getCountryCode(country = "") {
  const value = String(country)
    .trim()
    .toLowerCase();

  // ====================================================
  // EUROPE
  // ====================================================

  if (value.includes("ireland")) return "IE";
  if (value.includes("germany")) return "DE";

  if (
    value.includes("united kingdom") ||
    value === "uk" ||
    value.includes("england") ||
    value.includes("great britain")
  ) {
    return "GB";
  }

  if (
    value.includes("czech") ||
    value.includes("czech republic")
  ) {
    return "CZ";
  }

  if (value.includes("spain")) return "ES";
  if (value.includes("romania")) return "RO";
  if (value.includes("finland")) return "FI";
  if (value.includes("france")) return "FR";
  if (value.includes("italy")) return "IT";
  if (value.includes("netherlands")) return "NL";
  if (value.includes("belgium")) return "BE";
  if (value.includes("poland")) return "PL";
  if (value.includes("sweden")) return "SE";
  if (value.includes("norway")) return "NO";
  if (value.includes("denmark")) return "DK";
  if (value.includes("switzerland")) return "CH";
  if (value.includes("austria")) return "AT";
  if (value.includes("portugal")) return "PT";
  if (value.includes("greece")) return "GR";

  // ====================================================
  // ASIA
  // ====================================================

  if (value.includes("india")) return "IN";
  if (value.includes("malaysia")) return "MY";
  if (value.includes("singapore")) return "SG";
  if (value.includes("china")) return "CN";
  if (value.includes("japan")) return "JP";

  if (
    value.includes("south korea") ||
    value === "korea" ||
    value.includes("korea")
  ) {
    return "KR";
  }

  if (value.includes("indonesia")) return "ID";
  if (value.includes("thailand")) return "TH";
  if (value.includes("vietnam")) return "VN";
  if (value.includes("philippines")) return "PH";
  if (value.includes("taiwan")) return "TW";

  // ====================================================
  // AFRICA
  // ====================================================

  if (value.includes("south africa")) return "ZA";
  if (value.includes("nigeria")) return "NG";
  if (value.includes("kenya")) return "KE";
  if (value.includes("egypt")) return "EG";
  if (value.includes("morocco")) return "MA";

  // ====================================================
  // NORTH AMERICA
  // ====================================================

  if (
    value.includes("united states") ||
    value === "usa" ||
    value.includes("america")
  ) {
    return "US";
  }

  if (value.includes("canada")) return "CA";
  if (value.includes("mexico")) return "MX";
  if (value.includes("costa rica")) return "CR";
  if (value.includes("panama")) return "PA";

  // ====================================================
  // SOUTH AMERICA
  // ====================================================

  if (value.includes("brazil")) return "BR";
  if (value.includes("argentina")) return "AR";
  if (value.includes("chile")) return "CL";
  if (value.includes("colombia")) return "CO";
  if (value.includes("peru")) return "PE";

  return "";
}

// ======================================================
// NORMALIZE COUNTRY CODE
// ======================================================
//
// IMPORTANT:
// The flag is now determined from COUNTRY.
// We do not depend on the API flag field.
// ======================================================

function normalizeCountryCode(country = "") {
  return getCountryCode(country);
}

// ======================================================
// MANUAL SVG FLAGS
// ======================================================

function ManualFlag({ countryCode }) {
  const code = String(countryCode || "").toUpperCase();

  const commonClass =
    "h-7 w-10 rounded-md object-cover";

  const commonProps = {
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
  };

  switch (code) {
    // ==================================================
    // INDIA
    // ==================================================

    case "IN":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="India flag"
        >
          <rect width="90" height="20" fill="#FF9933" />
          <rect y="20" width="90" height="20" fill="#FFFFFF" />
          <rect y="40" width="90" height="20" fill="#138808" />

          <circle
            cx="45"
            cy="30"
            r="7"
            fill="none"
            stroke="#000080"
            strokeWidth="1.5"
          />

          <circle
            cx="45"
            cy="30"
            r="1.5"
            fill="#000080"
          />
        </svg>
      );

    // ==================================================
    // UNITED STATES
    // ==================================================

    case "US":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="United States flag"
        >
          <rect width="90" height="60" fill="#B22234" />

          <path
            d="
              M0 6.67H90
              M0 20H90
              M0 33.33H90
              M0 46.67H90
            "
            stroke="#FFFFFF"
            strokeWidth="6.67"
          />

          <rect
            width="36"
            height="32"
            fill="#3C3B6E"
          />

          <g fill="#FFFFFF">
            <circle cx="4" cy="5" r="1" />
            <circle cx="10" cy="5" r="1" />
            <circle cx="16" cy="5" r="1" />
            <circle cx="22" cy="5" r="1" />
            <circle cx="28" cy="5" r="1" />

            <circle cx="7" cy="11" r="1" />
            <circle cx="13" cy="11" r="1" />
            <circle cx="19" cy="11" r="1" />
            <circle cx="25" cy="11" r="1" />
            <circle cx="31" cy="11" r="1" />

            <circle cx="4" cy="17" r="1" />
            <circle cx="10" cy="17" r="1" />
            <circle cx="16" cy="17" r="1" />
            <circle cx="22" cy="17" r="1" />
            <circle cx="28" cy="17" r="1" />

            <circle cx="7" cy="23" r="1" />
            <circle cx="13" cy="23" r="1" />
            <circle cx="19" cy="23" r="1" />
            <circle cx="25" cy="23" r="1" />
            <circle cx="31" cy="23" r="1" />

            <circle cx="4" cy="29" r="1" />
            <circle cx="10" cy="29" r="1" />
            <circle cx="16" cy="29" r="1" />
            <circle cx="22" cy="29" r="1" />
            <circle cx="28" cy="29" r="1" />
          </g>
        </svg>
      );

    // ==================================================
    // UNITED KINGDOM
    // ==================================================

    case "GB":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="United Kingdom flag"
        >
          <rect width="90" height="60" fill="#012169" />

          <path
            d="M0 0L90 60M90 0L0 60"
            stroke="#FFFFFF"
            strokeWidth="12"
          />

          <path
            d="M0 0L90 60M90 0L0 60"
            stroke="#C8102E"
            strokeWidth="6"
          />

          <path
            d="M45 0V60M0 30H90"
            stroke="#FFFFFF"
            strokeWidth="18"
          />

          <path
            d="M45 0V60M0 30H90"
            stroke="#C8102E"
            strokeWidth="10"
          />
        </svg>
      );

    // ==================================================
    // GERMANY
    // ==================================================

    case "DE":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Germany flag"
        >
          <rect width="90" height="20" fill="#000000" />
          <rect y="20" width="90" height="20" fill="#DD0000" />
          <rect y="40" width="90" height="20" fill="#FFCE00" />
        </svg>
      );

    // ==================================================
    // IRELAND
    // ==================================================

    case "IE":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Ireland flag"
        >
          <rect width="30" height="60" fill="#169B62" />
          <rect x="30" width="30" height="60" fill="#FFFFFF" />
          <rect x="60" width="30" height="60" fill="#FF883E" />
        </svg>
      );

    // ==================================================
    // CZECH REPUBLIC
    // ==================================================

    case "CZ":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Czech Republic flag"
        >
          <rect width="90" height="30" fill="#FFFFFF" />
          <rect y="30" width="90" height="30" fill="#D7141A" />

          <polygon
            points="0,0 45,30 0,60"
            fill="#11457E"
          />
        </svg>
      );

    // ==================================================
    // SPAIN
    // ==================================================

    case "ES":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Spain flag"
        >
          <rect width="90" height="60" fill="#AA151B" />
          <rect y="15" width="90" height="30" fill="#F1BF00" />
        </svg>
      );

    // ==================================================
    // ROMANIA
    // ==================================================

    case "RO":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Romania flag"
        >
          <rect width="30" height="60" fill="#002B7F" />
          <rect x="30" width="30" height="60" fill="#FCD116" />
          <rect x="60" width="30" height="60" fill="#CE1126" />
        </svg>
      );

    // ==================================================
    // FINLAND
    // ==================================================

    case "FI":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Finland flag"
        >
          <rect width="90" height="60" fill="#FFFFFF" />

          <rect
            x="25"
            width="10"
            height="60"
            fill="#003580"
          />

          <rect
            y="25"
            width="90"
            height="10"
            fill="#003580"
          />
        </svg>
      );

    // ==================================================
    // FRANCE
    // ==================================================

    case "FR":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="France flag"
        >
          <rect width="30" height="60" fill="#0055A4" />
          <rect x="30" width="30" height="60" fill="#FFFFFF" />
          <rect x="60" width="30" height="60" fill="#EF4135" />
        </svg>
      );

    // ==================================================
    // ITALY
    // ==================================================

    case "IT":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Italy flag"
        >
          <rect width="30" height="60" fill="#009246" />
          <rect x="30" width="30" height="60" fill="#FFFFFF" />
          <rect x="60" width="30" height="60" fill="#CE2B37" />
        </svg>
      );

    // ==================================================
    // NETHERLANDS
    // ==================================================

    case "NL":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Netherlands flag"
        >
          <rect width="90" height="20" fill="#AE1C28" />
          <rect y="20" width="90" height="20" fill="#FFFFFF" />
          <rect y="40" width="90" height="20" fill="#21468B" />
        </svg>
      );

    // ==================================================
    // BELGIUM
    // ==================================================

    case "BE":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Belgium flag"
        >
          <rect width="30" height="60" fill="#000000" />
          <rect x="30" width="30" height="60" fill="#FAE042" />
          <rect x="60" width="30" height="60" fill="#ED2939" />
        </svg>
      );

    // ==================================================
    // POLAND
    // ==================================================

    case "PL":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Poland flag"
        >
          <rect width="90" height="30" fill="#FFFFFF" />
          <rect y="30" width="90" height="30" fill="#DC143C" />
        </svg>
      );

    // ==================================================
    // SWEDEN
    // ==================================================

    case "SE":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Sweden flag"
        >
          <rect width="90" height="60" fill="#006AA7" />

          <rect
            x="25"
            width="10"
            height="60"
            fill="#FECC00"
          />

          <rect
            y="25"
            width="90"
            height="10"
            fill="#FECC00"
          />
        </svg>
      );

    // ==================================================
    // NORWAY
    // ==================================================

    case "NO":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Norway flag"
        >
          <rect width="90" height="60" fill="#BA0C2F" />

          <rect
            x="25"
            width="18"
            height="60"
            fill="#FFFFFF"
          />

          <rect
            y="21"
            width="90"
            height="18"
            fill="#FFFFFF"
          />

          <rect
            x="29"
            width="10"
            height="60"
            fill="#00205B"
          />

          <rect
            y="25"
            width="90"
            height="10"
            fill="#00205B"
          />
        </svg>
      );

    // ==================================================
    // DENMARK
    // ==================================================

    case "DK":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Denmark flag"
        >
          <rect width="90" height="60" fill="#C8102E" />

          <rect
            x="25"
            width="10"
            height="60"
            fill="#FFFFFF"
          />

          <rect
            y="25"
            width="90"
            height="10"
            fill="#FFFFFF"
          />
        </svg>
      );

    // ==================================================
    // SWITZERLAND
    // ==================================================

    case "CH":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Switzerland flag"
        >
          <rect
            width="90"
            height="60"
            rx="4"
            fill="#D52B1E"
          />

          <rect
            x="38"
            y="12"
            width="14"
            height="36"
            fill="#FFFFFF"
          />

          <rect
            x="27"
            y="23"
            width="36"
            height="14"
            fill="#FFFFFF"
          />
        </svg>
      );

    // ==================================================
    // AUSTRIA
    // ==================================================

    case "AT":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Austria flag"
        >
          <rect width="90" height="20" fill="#ED2939" />
          <rect y="20" width="90" height="20" fill="#FFFFFF" />
          <rect y="40" width="90" height="20" fill="#ED2939" />
        </svg>
      );

    // ==================================================
    // PORTUGAL
    // ==================================================

    case "PT":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Portugal flag"
        >
          <rect width="36" height="60" fill="#046A38" />
          <rect x="36" width="54" height="60" fill="#DA291C" />

          <circle
            cx="36"
            cy="30"
            r="10"
            fill="#FECB00"
          />

          <circle
            cx="36"
            cy="30"
            r="6"
            fill="#FFFFFF"
          />
        </svg>
      );

    // ==================================================
    // GREECE
    // ==================================================

    case "GR":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Greece flag"
        >
          <rect width="90" height="60" fill="#0D5EAF" />

          <path
            d="
              M0 6.67H90
              M0 20H90
              M0 33.33H90
              M0 46.67H90
            "
            stroke="#FFFFFF"
            strokeWidth="6.67"
          />

          <rect
            width="35"
            height="35"
            fill="#0D5EAF"
          />

          <path
            d="M17.5 0V35M0 17.5H35"
            stroke="#FFFFFF"
            strokeWidth="7"
          />
        </svg>
      );

    // ==================================================
    // MALAYSIA
    // ==================================================

    case "MY":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Malaysia flag"
        >
          <rect width="90" height="60" fill="#CC0001" />

          <path
            d="
              M0 0H90V7H0ZM0 14H90V21H0ZM0 28H90V35H0ZM0 42H90V49H0ZM0 56H90V60H0Z
            "
            fill="#FFFFFF"
          />

          <rect
            width="45"
            height="30"
            fill="#010066"
          />

          <circle
            cx="18"
            cy="15"
            r="8"
            fill="#FFCC00"
          />

          <circle
            cx="21"
            cy="13"
            r="7"
            fill="#010066"
          />

          <polygon
            points="31,8 32.5,12 37,12 33.5,14.5 35,19 31,16 27,19 28.5,14.5 25,12 29.5,12"
            fill="#FFCC00"
          />
        </svg>
      );

    // ==================================================
    // SINGAPORE
    // ==================================================

    case "SG":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Singapore flag"
        >
          <rect width="90" height="30" fill="#ED2939" />
          <rect y="30" width="90" height="30" fill="#FFFFFF" />

          <circle
            cx="18"
            cy="15"
            r="9"
            fill="#FFFFFF"
          />

          <circle
            cx="22"
            cy="15"
            r="9"
            fill="#ED2939"
          />

          <g fill="#FFFFFF">
            <circle cx="31" cy="8" r="1.5" />
            <circle cx="34" cy="11" r="1.5" />
            <circle cx="35" cy="15" r="1.5" />
            <circle cx="34" cy="19" r="1.5" />
            <circle cx="31" cy="22" r="1.5" />
          </g>
        </svg>
      );

    // ==================================================
    // CHINA
    // ==================================================

    case "CN":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="China flag"
        >
          <rect width="90" height="60" fill="#DE2910" />

          <polygon
            points="18,7 20.5,14 28,14 22,18.5 24,26 18,21.5 12,26 14,18.5 8,14 15.5,14"
            fill="#FFDE00"
          />

          <g fill="#FFDE00">
            <polygon points="32,7 33.5,11 37.5,11 34.5,13.5 35.5,17.5 32,15 28.5,17.5 29.5,13.5 26.5,11 30.5,11" />
            <polygon points="38,16 39.5,20 43.5,20 40.5,22.5 41.5,26.5 38,24 34.5,26.5 35.5,22.5 32.5,20 36.5,20" />
            <polygon points="37,28 38.5,32 42.5,32 39.5,34.5 40.5,38.5 37,36 33.5,38.5 34.5,34.5 31.5,32 35.5,32" />
            <polygon points="31,38 32.5,42 36.5,42 33.5,44.5 34.5,48.5 31,46 27.5,48.5 28.5,44.5 25.5,42 29.5,42" />
          </g>
        </svg>
      );

    // ==================================================
    // JAPAN
    // ==================================================

    case "JP":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Japan flag"
        >
          <rect width="90" height="60" fill="#FFFFFF" />

          <circle
            cx="45"
            cy="30"
            r="15"
            fill="#BC002D"
          />
        </svg>
      );

    // ==================================================
    // SOUTH KOREA
    // ==================================================

    case "KR":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="South Korea flag"
        >
          <rect width="90" height="60" fill="#FFFFFF" />

          <circle
            cx="45"
            cy="30"
            r="11"
            fill="#CD2E3A"
          />

          <path
            d="M45 19A11 11 0 0 1 45 41A5.5 5.5 0 0 0 45 30A5.5 5.5 0 0 1 45 19Z"
            fill="#0047A0"
          />

          <path
            d="M19 13L27 17M17 18L25 22M15 23L23 27"
            stroke="#000000"
            strokeWidth="3"
          />

          <path
            d="M63 13L71 17M65 18L73 22M67 23L75 27"
            stroke="#000000"
            strokeWidth="3"
          />

          <path
            d="M19 47L27 43M17 42L25 38M15 37L23 33"
            stroke="#000000"
            strokeWidth="3"
          />

          <path
            d="M63 47L71 43M65 42L73 38M67 37L75 33"
            stroke="#000000"
            strokeWidth="3"
          />
        </svg>
      );

    // ==================================================
    // INDONESIA
    // ==================================================

    case "ID":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Indonesia flag"
        >
          <rect width="90" height="30" fill="#CE1126" />
          <rect y="30" width="90" height="30" fill="#FFFFFF" />
        </svg>
      );

    // ==================================================
    // THAILAND
    // ==================================================

    case "TH":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Thailand flag"
        >
          <rect width="90" height="60" fill="#A51931" />

          <rect
            y="10"
            width="90"
            height="40"
            fill="#FFFFFF"
          />

          <rect
            y="20"
            width="90"
            height="20"
            fill="#2D2A4A"
          />
        </svg>
      );

    // ==================================================
    // VIETNAM
    // ==================================================

    case "VN":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Vietnam flag"
        >
          <rect width="90" height="60" fill="#DA251D" />

          <polygon
            points="45,10 49,25 65,25 52,34 57,49 45,40 33,49 38,34 25,25 41,25"
            fill="#FFDD00"
          />
        </svg>
      );

    // ==================================================
    // PHILIPPINES
    // ==================================================

    case "PH":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Philippines flag"
        >
          <rect width="90" height="30" fill="#0038A8" />
          <rect y="30" width="90" height="30" fill="#CE1126" />

          <polygon
            points="0,0 0,60 52,30"
            fill="#FFFFFF"
          />

          <circle
            cx="10"
            cy="30"
            r="3"
            fill="#FCD116"
          />

          <polygon
            points="12,20 13,24 17,24 14,26 15,30 12,28 9,30 10,26 7,24 11,24"
            fill="#FCD116"
          />
        </svg>
      );

    // ==================================================
    // TAIWAN
    // ==================================================

    case "TW":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Taiwan flag"
        >
          <rect width="90" height="60" fill="#FE0000" />

          <rect
            width="45"
            height="30"
            fill="#000095"
          />

          <circle
            cx="22.5"
            cy="15"
            r="8"
            fill="#FFFFFF"
          />

          <circle
            cx="22.5"
            cy="15"
            r="5"
            fill="#000095"
          />
        </svg>
      );

    // ==================================================
    // SOUTH AFRICA
    // ==================================================

    case "ZA":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="South Africa flag"
        >
          <rect width="90" height="60" fill="#E03C31" />

          <polygon
            points="0,0 0,60 45,30"
            fill="#002395"
          />

          <polygon
            points="0,0 0,60 45,30"
            fill="#000000"
            stroke="#FFB81C"
            strokeWidth="6"
          />

          <polygon
            points="0,0 0,60 45,30"
            fill="#007A4D"
            stroke="#FFFFFF"
            strokeWidth="5"
          />
        </svg>
      );

    // ==================================================
    // NIGERIA
    // ==================================================

    case "NG":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Nigeria flag"
        >
          <rect width="30" height="60" fill="#008751" />
          <rect x="30" width="30" height="60" fill="#FFFFFF" />
          <rect x="60" width="30" height="60" fill="#008751" />
        </svg>
      );

    // ==================================================
    // KENYA
    // ==================================================

    case "KE":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Kenya flag"
        >
          <rect width="90" height="20" fill="#000000" />
          <rect y="20" width="90" height="20" fill="#BB1E10" />
          <rect y="40" width="90" height="20" fill="#006B3F" />

          <rect
            x="38"
            y="12"
            width="14"
            height="36"
            rx="7"
            fill="#FFFFFF"
          />

          <ellipse
            cx="45"
            cy="30"
            rx="5"
            ry="17"
            fill="#BB1E10"
          />
        </svg>
      );

    // ==================================================
    // EGYPT
    // ==================================================

    case "EG":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Egypt flag"
        >
          <rect width="90" height="20" fill="#CE1126" />
          <rect y="20" width="90" height="20" fill="#FFFFFF" />
          <rect y="40" width="90" height="20" fill="#000000" />

          <rect
            x="40"
            y="24"
            width="10"
            height="12"
            fill="#C09300"
          />
        </svg>
      );

    // ==================================================
    // MOROCCO
    // ==================================================

    case "MA":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Morocco flag"
        >
          <rect width="90" height="60" fill="#C1272D" />

          <polygon
            points="45,13 49,26 62,26 51,34 55,47 45,39 35,47 39,34 28,26 41,26"
            fill="none"
            stroke="#006233"
            strokeWidth="2"
          />
        </svg>
      );

    // ==================================================
    // CANADA
    // ==================================================

    case "CA":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Canada flag"
        >
          <rect width="22.5" height="60" fill="#FF0000" />
          <rect x="22.5" width="45" height="60" fill="#FFFFFF" />
          <rect x="67.5" width="22.5" height="60" fill="#FF0000" />

          <polygon
            points="
              45,12
              49,23
              57,20
              53,28
              61,32
              51,34
              53,45
              45,39
              37,45
              39,34
              29,32
              37,28
              33,20
              41,23
            "
            fill="#FF0000"
          />
        </svg>
      );

    // ==================================================
    // MEXICO
    // ==================================================

    case "MX":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Mexico flag"
        >
          <rect width="30" height="60" fill="#006847" />
          <rect x="30" width="30" height="60" fill="#FFFFFF" />
          <rect x="60" width="30" height="60" fill="#CE1126" />

          <circle
            cx="45"
            cy="30"
            r="7"
            fill="#8C6239"
          />

          <path
            d="M45 23c-3 3-4 7-3 11 2-2 5-2 7 0 1-4 0-8-4-11z"
            fill="#2E7D32"
          />

          <circle
            cx="45"
            cy="30"
            r="2"
            fill="#A67C52"
          />
        </svg>
      );

    // ==================================================
    // COSTA RICA
    // ==================================================

    case "CR":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Costa Rica flag"
        >
          <rect width="90" height="60" fill="#FFFFFF" />

          <rect
            y="0"
            width="90"
            height="10"
            fill="#002B7F"
          />

          <rect
            y="10"
            width="90"
            height="10"
            fill="#FFFFFF"
          />

          <rect
            y="20"
            width="90"
            height="20"
            fill="#CE1126"
          />

          <rect
            y="40"
            width="90"
            height="10"
            fill="#FFFFFF"
          />

          <rect
            y="50"
            width="90"
            height="10"
            fill="#002B7F"
          />

          <circle
            cx="20"
            cy="30"
            r="6"
            fill="#FFFFFF"
          />

          <circle
            cx="20"
            cy="30"
            r="4"
            fill="#002B7F"
          />
        </svg>
      );

    // ==================================================
    // PANAMA
    // ==================================================

    case "PA":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Panama flag"
        >
          <rect width="45" height="30" fill="#FFFFFF" />
          <rect x="45" width="45" height="30" fill="#D21034" />
          <rect y="30" width="45" height="30" fill="#D21034" />
          <rect x="45" y="30" width="45" height="30" fill="#FFFFFF" />

          <polygon
            points="22,9 24,15 30,15 25,19 27,25 22,21 17,25 19,19 14,15 20,15"
            fill="#005EB8"
          />

          <polygon
            points="67,39 69,45 75,45 70,49 72,55 67,51 62,55 64,49 59,45 65,45"
            fill="#D21034"
          />
        </svg>
      );

    // ==================================================
    // BRAZIL
    // ==================================================

    case "BR":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Brazil flag"
        >
          <rect width="90" height="60" fill="#009B3A" />

          <polygon
            points="45,5 85,30 45,55 5,30"
            fill="#FFDF00"
          />

          <circle
            cx="45"
            cy="30"
            r="13"
            fill="#002776"
          />

          <path
            d="M33 28C40 25 50 25 58 28"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      );

    // ==================================================
    // ARGENTINA
    // ==================================================

    case "AR":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Argentina flag"
        >
          <rect width="90" height="20" fill="#74ACDF" />
          <rect y="20" width="90" height="20" fill="#FFFFFF" />
          <rect y="40" width="90" height="20" fill="#74ACDF" />

          <circle
            cx="45"
            cy="30"
            r="5"
            fill="#F6B40E"
          />
        </svg>
      );

    // ==================================================
    // CHILE
    // ==================================================

    case "CL":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Chile flag"
        >
          <rect width="90" height="30" fill="#FFFFFF" />
          <rect y="30" width="90" height="30" fill="#D52B1E" />

          <rect
            width="30"
            height="30"
            fill="#0039A6"
          />

          <polygon
            points="
              15,7
              17,13
              23,13
              18,17
              20,23
              15,19
              10,23
              12,17
              7,13
              13,13
            "
            fill="#FFFFFF"
          />
        </svg>
      );

    // ==================================================
    // COLOMBIA
    // ==================================================

    case "CO":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Colombia flag"
        >
          <rect width="90" height="30" fill="#FCD116" />
          <rect y="30" width="90" height="15" fill="#003893" />
          <rect y="45" width="90" height="15" fill="#CE1126" />
        </svg>
      );

    // ==================================================
    // PERU
    // ==================================================

    case "PE":
      return (
        <svg
          {...commonProps}
          viewBox="0 0 90 60"
          className={commonClass}
          aria-label="Peru flag"
        >
          <rect width="30" height="60" fill="#D91023" />
          <rect x="30" width="30" height="60" fill="#FFFFFF" />
          <rect x="60" width="30" height="60" fill="#D91023" />
        </svg>
      );

    // ==================================================
    // DEFAULT
    // ==================================================

    default:
      return (
        <span
          className="
            flex
            h-7
            w-10
            items-center
            justify-center
            rounded-md
            border
            border-[#DDE3F2]
            bg-[#F7F9FC]
            text-xs
            font-bold
            text-[#173DB8]
          "
          aria-label="Country flag unavailable"
          title="Country flag unavailable"
        >
          --
        </span>
      );
  }
}

// ======================================================
// REGION DETECTION
// ======================================================

function detectRegion(country = "") {
  const value = String(country).toLowerCase();

  // ====================================================
  // EUROPE
  // ====================================================

  if (
    [
      "ireland",
      "united kingdom",
      "germany",
      "czech",
      "spain",
      "romania",
      "finland",
      "france",
      "italy",
      "netherlands",
      "belgium",
      "poland",
      "sweden",
      "norway",
      "denmark",
      "switzerland",
      "austria",
      "portugal",
      "greece",
    ].some((item) => value.includes(item))
  ) {
    return "Europe";
  }

  // ====================================================
  // ASIA
  // ====================================================

  if (
    [
      "india",
      "malaysia",
      "singapore",
      "china",
      "japan",
      "korea",
      "indonesia",
      "thailand",
      "vietnam",
      "philippines",
      "taiwan",
    ].some((item) => value.includes(item))
  ) {
    return "Asia";
  }

  // ====================================================
  // AFRICA
  // ====================================================

  if (
    [
      "south africa",
      "africa",
      "nigeria",
      "kenya",
      "egypt",
      "morocco",
    ].some((item) => value.includes(item))
  ) {
    return "Africa";
  }

  // ====================================================
  // NORTH AMERICA
  // ====================================================

  if (
    [
      "united states",
      "usa",
      "america",
      "mexico",
      "costa rica",
      "canada",
      "panama",
    ].some((item) => value.includes(item))
  ) {
    return "North America";
  }

  // ====================================================
  // SOUTH AMERICA
  // ====================================================

  if (
    [
      "brazil",
      "argentina",
      "chile",
      "colombia",
      "peru",
    ].some((item) => value.includes(item))
  ) {
    return "South America";
  }

  return "Other";
}

// ======================================================
// WEBSITE URL
// ======================================================

function getWebsiteUrl(website = "") {
  if (!website) {
    return "";
  }

  if (
    website.startsWith("http://") ||
    website.startsWith("https://")
  ) {
    return website;
  }

  return `https://${website}`;
}

// ======================================================
// NORMALIZE DISTRIBUTOR
// ======================================================

function normalizeDistributor(item, index) {
  if (!item) {
    return null;
  }

  // ====================================================
  // COUNTRY
  // ====================================================

  const country =
    item.country ||
    "International";

  // ====================================================
  // COMPANY
  // ====================================================

  const companyName =
    item.companyName ||
    item.company ||
    item.name ||
    "";

  if (!String(companyName).trim()) {
    return null;
  }

  // ====================================================
  // EMAILS
  // ====================================================

  let emails = [];

  if (Array.isArray(item.emails)) {
    emails = item.emails
      .map((email) => String(email).trim())
      .filter(Boolean);
  } else if (typeof item.emails === "string") {
    emails = item.emails
      .split(/[,;|]/)
      .map((email) => email.trim())
      .filter(Boolean);
  } else if (item.email) {
    emails = [
      String(item.email).trim(),
    ].filter(Boolean);
  }

  // ====================================================
  // LOCATION
  // ====================================================

  let location = "";

  if (typeof item.location === "string") {
    location = item.location.trim();
  } else {
    location = [
      item.city,
      item.state ||
        item.stateProvince ||
        item.province,
      country,
      item.postalCode ||
        item.zipCode ||
        item.zip,
    ]
      .filter(Boolean)
      .join(", ");
  }

  // ====================================================
  // WEBSITE
  // ====================================================

  const website =
    item.website ||
    item.websiteUrl ||
    item.url ||
    "";

  // ====================================================
  // PHONE
  // ====================================================

  const phone =
    item.phone ||
    item.phoneNumber ||
    "";

  // ====================================================
  // REGION
  // ====================================================

  const region =
    item.region ||
    item.continent ||
    detectRegion(country);

  // ====================================================
  // FLAG
  // ====================================================
  //
  // IMPORTANT:
  // Always calculate the flag from COUNTRY.
  // API flag value is intentionally ignored.
  // ====================================================

  const flag = normalizeCountryCode(country);

  // ====================================================
  // RETURN
  // ====================================================

  return {
    id:
      item._id ||
      item.id ||
      `admin-distributor-${index}`,

    companyName:
      String(companyName).trim(),

    country,

    region,

    location,

    city:
      item.city || "",

    state:
      item.state ||
      item.stateProvince ||
      item.province ||
      "",

    postalCode:
      item.postalCode ||
      item.zipCode ||
      item.zip ||
      "",

    emails,

    phone,

    phoneDisplay:
      item.phoneDisplay ||
      phone ||
      "N/A",

    website,

    flag,

    status:
      item.status ||
      "Active",

    sortOrder:
      Number.isFinite(
        Number(item.sortOrder)
      )
        ? Number(item.sortOrder)
        : 0,
  };
}

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function DistributorPage() {
  const api = useApiClient();

  const [search, setSearch] =
    useState("");

  const [
    selectedRegion,
    setSelectedRegion,
  ] = useState("All Regions");

  // ====================================================
  // ADMIN API
  // ====================================================

  const distributorsQuery =
    api.useGet(
      "distributors",
      "/distributors"
    );

  // ====================================================
  // GET API DATA
  // ====================================================

  const distributors =
    useMemo(() => {
      const response =
        distributorsQuery?.data;

      if (!response) {
        return [];
      }

      let data = [];

      // -----------------------------------------------
      // { success: true, data: [...] }
      // -----------------------------------------------

      if (
        Array.isArray(
          response?.data
        )
      ) {
        data = response.data;
      }

      // -----------------------------------------------
      // Direct array
      // -----------------------------------------------

      else if (
        Array.isArray(response)
      ) {
        data = response;
      }

      // -----------------------------------------------
      // { distributors: [...] }
      // -----------------------------------------------

      else if (
        Array.isArray(
          response?.distributors
        )
      ) {
        data =
          response.distributors;
      }

      // -----------------------------------------------
      // { data: { distributors: [...] } }
      // -----------------------------------------------

      else if (
        Array.isArray(
          response?.data
            ?.distributors
        )
      ) {
        data =
          response.data
            .distributors;
      }

      // -----------------------------------------------
      // { results: [...] }
      // -----------------------------------------------

      else if (
        Array.isArray(
          response?.results
        )
      ) {
        data = response.results;
      }

      return data
        .map(normalizeDistributor)
        .filter(Boolean)
        .filter(
          (item) =>
            item.status !==
            "Inactive"
        );
    }, [
      distributorsQuery?.data,
    ]);

  // ====================================================
  // REGIONS
  // ====================================================

  const regions =
    useMemo(() => {
      const regionList =
        distributors
          .map(
            (item) =>
              item.region
          )
          .filter(Boolean);

      return [
        "All Regions",
        ...Array.from(
          new Set(regionList)
        ).sort(),
      ];
    }, [distributors]);

  // ====================================================
  // FILTERED DISTRIBUTORS
  // ====================================================

  const filteredDistributors =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return distributors.filter(
        (distributor) => {
          const searchableText = [
            distributor.companyName,
            distributor.country,
            distributor.region,
            distributor.location,
            distributor.city,
            distributor.state,
            distributor.postalCode,
            distributor.phone,
            ...(distributor.emails || []),
            distributor.website,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !searchValue ||
            searchableText.includes(
              searchValue
            );

          const matchesRegion =
            selectedRegion ===
              "All Regions" ||
            distributor.region ===
              selectedRegion;

          return (
            matchesSearch &&
            matchesRegion
          );
        }
      );
    }, [
      distributors,
      search,
      selectedRegion,
    ]);

  // ====================================================
  // LOADING
  // ====================================================

  const isLoading =
    distributorsQuery?.isLoading ||
    distributorsQuery?.isPending;

  // ====================================================
  // ERROR
  // ====================================================

  const isError =
    distributorsQuery?.isError;

  // ====================================================
  // UI
  // ====================================================

  return (
    <>
      <Header />

      <main
        className="
          min-h-screen
          bg-[#F7F9FC]
        "
      >
        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="
            relative
            overflow-hidden
            bg-[#173DB8]
            text-white
          "
        >
          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-[0.055]
              bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
              bg-[size:60px_60px]
            "
          />

          <div
            className="
              absolute
              -top-40
              -right-40
              h-96
              w-96
              rounded-full
              bg-[#6E8BFF]/20
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              -bottom-48
              -left-40
              h-96
              w-96
              rounded-full
              bg-white/10
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              relative
              max-w-7xl
              mx-auto
              px-5
              sm:px-8
              py-14
              sm:py-16
              lg:py-20
            "
          >
            <div
              className="
                grid
                lg:grid-cols-[1.2fr_0.8fr]
                gap-20
                lg:gap-16
                items-center
              "
            >
              {/* LEFT */}

              <div>
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2.5
                    px-4
                    py-2
                    rounded-full
                    bg-white/10
                    border
                    border-white/20
                    backdrop-blur-sm
                    text-sm
                    font-semibold
                  "
                >
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-white/15
                    "
                  >
                    <UsersIcon className="h-4 w-4" />
                  </span>

                  Worldwide Network
                </div>

                <h1
                  className="
                    mt-6
                    text-4xl
                    sm:text-5xl
                    lg:text-6xl
                    xl:text-[64px]
                    font-bold
                    tracking-tight
                    leading-[1.04]
                  "
                >
                  Our Worldwide

                  <span
                    className="
                      block
                      text-[#AFC0FF]
                    "
                  >
                    Distributors
                  </span>
                </h1>

                <p
                  className="
                    mt-6
                    max-w-2xl
                    text-base
                    sm:text-lg
                    leading-7
                    sm:leading-8
                    text-white/80
                  "
                >
                  Connect with our trusted
                  distribution partners around
                  the world for expert support,
                  product information and
                  contamination control
                  solutions.
                </p>

                <div
                  className="
                    mt-8
                    flex
                    flex-wrap
                    gap-4
                  "
                >
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/15
                      px-5
                      py-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-[#173DB8]
                      "
                    >
                      <UsersIcon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xl font-bold">
                        {distributors.length}
                      </p>

                      <p className="text-xs text-white/60">
                        Distribution Partners
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-white/10
                      border
                      border-white/15
                      px-5
                      py-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        text-[#173DB8]
                      "
                    >
                      <GlobeAltIcon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xl font-bold">
                        Worldwide
                      </p>

                      <p className="text-xs text-white/60">
                        International Coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GLOBE */}

              <div className="flex-1 flex items-center justify-end overflow-visible">
                <Globe />
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            SEARCH / FILTER
        ================================================= */}

        <section
          className="
            relative
            z-10
            mt-8
            px-5
            sm:px-8
            lg:px-12
          "
        >
          <div
            className="
              mx-auto
              max-w-7xl
              rounded-3xl
              border
              border-[#DDE3F2]
              bg-white
              p-5
              shadow-xl
              sm:p-7
            "
          >
            <div
              className="
                grid
                grid-cols-1
                gap-4
                lg:grid-cols-[1fr_240px]
              "
            >
              {/* SEARCH */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#30343B]
                  "
                >
                  Search distributors
                </label>

                <div className="relative">
                  <MagnifyingGlassIcon
                    className="
                      absolute
                      left-4
                      top-1/2
                      h-5
                      w-5
                      -translate-y-1/2
                      text-[#173DB8]
                    "
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search by company, country, city or region..."
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-[#D8DFEF]
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-[#30343B]
                      outline-none
                      transition
                      placeholder:text-[#9AA1AE]
                      focus:border-[#173DB8]
                      focus:ring-4
                      focus:ring-[#173DB8]/10
                    "
                  />
                </div>
              </div>

              {/* REGION */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#30343B]
                  "
                >
                  Region
                </label>

                <div className="relative">
                  <select
                    value={selectedRegion}
                    onChange={(event) =>
                      setSelectedRegion(
                        event.target.value
                      )
                    }
                    className="
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      border-[#D8DFEF]
                      bg-white
                      px-4
                      pr-10
                      text-sm
                      text-[#30343B]
                      outline-none
                      focus:border-[#173DB8]
                      focus:ring-4
                      focus:ring-[#173DB8]/10
                    "
                  >
                    {regions.map(
                      (region) => (
                        <option
                          key={region}
                          value={region}
                        >
                          {region}
                        </option>
                      )
                    )}
                  </select>

                  <ChevronDownIcon
                    className="
                      pointer-events-none
                      absolute
                      right-4
                      top-1/2
                      h-5
                      w-5
                      -translate-y-1/2
                      text-[#7B8494]
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            DISTRIBUTORS
        ================================================= */}

        <section
          className="
            px-5
            py-14
            sm:px-8
            lg:px-12
            lg:py-20
          "
        >
          <div className="mx-auto max-w-7xl">
            {/* SECTION HEADER */}

            <div
              className="
                mb-8
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-end
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#173DB8]
                  "
                >
                  Global
                </p>

                <h2
                  className="
                    mt-2
                    text-3xl
                    font-bold
                    tracking-tight
                    text-[#151515]
                  "
                >
                  Our Distributor Network
                </h2>
              </div>

              {!isLoading &&
                !isError && (
                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-[#606673]
                    "
                  >
                    <BuildingOffice2Icon
                      className="
                        h-5
                        w-5
                        text-[#173DB8]
                      "
                    />

                    {filteredDistributors.length}{" "}
                    distributor
                    {filteredDistributors.length !==
                    1
                      ? "s"
                      : ""}
                  </div>
                )}
            </div>

            {/* =================================================
                LOADING
            ================================================= */}

            {isLoading && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {Array.from({
                  length: 6,
                }).map(
                  (_, index) => (
                    <div
                      key={index}
                      className="
                        min-h-[390px]
                        animate-pulse
                        rounded-3xl
                        border
                        border-[#DDE3F2]
                        bg-white
                      "
                    >
                      <div className="h-1.5 rounded-t-3xl bg-[#EAF0FF]" />

                      <div className="p-6">
                        <div className="h-7 w-32 rounded bg-[#EEF1F6]" />

                        <div className="mt-5 h-8 w-3/4 rounded bg-[#EEF1F6]" />

                        <div className="mt-8 space-y-5">
                          <div className="h-12 rounded bg-[#F4F6F9]" />
                          <div className="h-12 rounded bg-[#F4F6F9]" />
                          <div className="h-12 rounded bg-[#F4F6F9]" />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {/* =================================================
                API ERROR
            ================================================= */}

            {!isLoading &&
              isError && (
                <div
                  className="
                    rounded-3xl
                    border
                    border-[#DDE3F2]
                    bg-white
                    px-6
                    py-16
                    text-center
                    shadow-sm
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#EAF0FF]
                      text-[#173DB8]
                    "
                  >
                    <BuildingOffice2Icon
                      className="h-8 w-8"
                    />
                  </div>

                  <h2
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      text-[#151515]
                    "
                  >
                    Distributor information
                    unavailable
                  </h2>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-xl
                      text-sm
                      leading-6
                      text-[#606673]
                    "
                  >
                    We could not load
                    distributor information
                    at this time. Please try
                    again later.
                  </p>
                </div>
              )}

            {/* =================================================
                EMPTY API
            ================================================= */}

            {!isLoading &&
              !isError &&
              distributors.length ===
                0 && (
                <div
                  className="
                    rounded-3xl
                    border
                    border-[#DDE3F2]
                    bg-white
                    px-6
                    py-16
                    text-center
                    shadow-sm
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#EAF0FF]
                      text-[#173DB8]
                    "
                  >
                    <BuildingOffice2Icon
                      className="h-8 w-8"
                    />
                  </div>

                  <h2
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      text-[#151515]
                    "
                  >
                    No Distributor Information
                    Available
                  </h2>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-xl
                      text-sm
                      leading-6
                      text-[#606673]
                    "
                  >
                    Distributor information
                    will appear here once it
                    is added from the admin
                    panel.
                  </p>
                </div>
              )}

            {/* =================================================
                NO SEARCH RESULTS
            ================================================= */}

            {!isLoading &&
              !isError &&
              distributors.length >
                0 &&
              filteredDistributors.length ===
                0 && (
                <div
                  className="
                    rounded-3xl
                    border
                    border-[#DDE3F2]
                    bg-white
                    px-6
                    py-16
                    text-center
                    shadow-sm
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-[#EAF0FF]
                      text-[#173DB8]
                    "
                  >
                    <MagnifyingGlassIcon
                      className="h-8 w-8"
                    />
                  </div>

                  <h2
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      text-[#151515]
                    "
                  >
                    No Distributors Found
                  </h2>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-xl
                      text-sm
                      leading-6
                      text-[#606673]
                    "
                  >
                    Try changing your search
                    term or selecting another
                    region.
                  </p>
                </div>
              )}

            {/* =================================================
                CARDS
            ================================================= */}

            {!isLoading &&
              !isError &&
              filteredDistributors.length >
                0 && (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-6
                    md:grid-cols-2
                    xl:grid-cols-3
                  "
                >
                  {filteredDistributors.map(
                    (
                      distributor,
                      index
                    ) => (
                      <DistributorCard
                        key={
                          distributor.id ||
                          index
                        }
                        distributor={
                          distributor
                        }
                      />
                    )
                  )}
                </div>
              )}

            {/* =================================================
                VERIFIED INFORMATION
            ================================================= */}

            {!isLoading &&
              !isError &&
              distributors.length >
                0 && (
                <div
                  className="
                    mt-8
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-[#DDE3F2]
                    bg-white
                    px-4
                    py-4
                    shadow-sm
                  "
                >
                  <CheckCircleIcon
                    className="
                      mt-0.5
                      h-5
                      w-5
                      shrink-0
                      text-[#173DB8]
                    "
                  />

                  <p
                    className="
                      text-sm
                      leading-6
                      text-[#606673]
                    "
                  >
                    Showing the verified
                    distributor information
                    provided by Global.
                  </p>
                </div>
              )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ======================================================
// DISTRIBUTOR CARD
// ======================================================

function DistributorCard({
  distributor,
}) {
  const {
    companyName,
    country,
    region,
    location,
    emails = [],
    phone,
    phoneDisplay,
    website,
  } = distributor;

  const websiteUrl =
    getWebsiteUrl(website);

  const phoneHref = phone
    ? `tel:${String(phone).replace(
        /[^\d+]/g,
        ""
      )}`
    : "";

  // ====================================================
  // DISPLAY VALUES
  // ====================================================

  const displayFlag =
    normalizeCountryCode(country);

  const displayRegion =
    region || "Global";

  const displayCountry =
    country ||
    "Country not specified";

  const displayLocation =
    location ||
    "Location not available";

  const hasPhone =
    Boolean(phone);

  const hasEmails =
    Array.isArray(emails) &&
    emails.length > 0;

  const hasWebsite =
    Boolean(website);

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        min-h-[390px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-[#DDE3F2]
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#BFCBEB]
        hover:shadow-xl
      "
    >
      {/* ==================================================
          BLUE TOP BORDER
      ================================================== */}

      <div
        className="
          h-1.5
          w-full
          bg-[#173DB8]
        "
      />

      {/* ==================================================
          CARD BODY
      ================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          p-6
        "
      >
        {/* =================================================
            COUNTRY / REGION
        ================================================= */}

        <div className="flex items-center gap-3">
          <span
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-[#F3F6FF]
            "
            title={displayCountry}
          >
            <ManualFlag
              countryCode={displayFlag}
            />
          </span>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#173DB8]
              "
            >
              {displayRegion}
            </p>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-[#606673]
              "
            >
              {displayCountry}
            </p>
          </div>
        </div>

        {/* =================================================
            COMPANY
        ================================================= */}

        <h2
          className="
            mt-5
            text-xl
            font-bold
            leading-7
            text-[#151515]
          "
        >
          {companyName ||
            "Distributor name unavailable"}
        </h2>

        {/* =================================================
            LOCATION
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#EAF0FF]
              text-[#173DB8]
            "
          >
            <MapPinIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-[#8A909D]
              "
            >
              Location
            </p>

            {location ? (
              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  text-[#606673]
                "
              >
                {displayLocation}
              </p>
            ) : (
              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  italic
                  text-[#9AA1AE]
                "
              >
                Location not available
              </p>
            )}
          </div>
        </div>

        {/* =================================================
            PHONE
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#EAF0FF]
              text-[#173DB8]
            "
          >
            <PhoneIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-[#8A909D]
              "
            >
              Phone
            </p>

            {hasPhone ? (
              <a
                href={phoneHref}
                className="
                  mt-1
                  block
                  break-words
                  text-sm
                  leading-6
                  text-[#606673]
                  transition
                  hover:text-[#173DB8]
                "
              >
                {phoneDisplay || phone}
              </a>
            ) : (
              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  italic
                  text-[#9AA1AE]
                "
              >
                Phone number not available
              </p>
            )}
          </div>
        </div>

        {/* =================================================
            EMAILS
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#EAF0FF]
              text-[#173DB8]
            "
          >
            <EnvelopeIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-[#8A909D]
              "
            >
              Email
            </p>

            {hasEmails ? (
              <div className="mt-1 space-y-1">
                {emails.map(
                  (email, index) => (
                    <a
                      key={`${email}-${index}`}
                      href={`mailto:${email}`}
                      className="
                        block
                        break-all
                        text-sm
                        leading-6
                        text-[#606673]
                        transition
                        hover:text-[#173DB8]
                      "
                    >
                      {email}
                    </a>
                  )
                )}
              </div>
            ) : (
              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  italic
                  text-[#9AA1AE]
                "
              >
                Email address not available
              </p>
            )}
          </div>
        </div>

        {/* =================================================
            WEBSITE
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-start
            gap-3
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#EAF0FF]
              text-[#173DB8]
            "
          >
            <GlobeAltIcon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-wide
                text-[#8A909D]
              "
            >
              Website
            </p>

            {hasWebsite ? (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-1
                  flex
                  items-center
                  gap-1.5
                  break-all
                  text-sm
                  leading-6
                  text-[#173DB8]
                  transition
                  hover:underline
                "
              >
                {website}

                <ArrowTopRightOnSquareIcon
                  className="
                    h-4
                    w-4
                    shrink-0
                  "
                />
              </a>
            ) : (
              <p
                className="
                  mt-1
                  text-sm
                  leading-6
                  italic
                  text-[#9AA1AE]
                "
              >
                Website not available
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}