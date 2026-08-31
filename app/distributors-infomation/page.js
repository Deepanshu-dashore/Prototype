  // "use client";

  // import React, { useMemo, useState } from "react";

  // import {
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

  // // ======================================================
  // // FALLBACK DISTRIBUTOR DATA
  // // ======================================================
  // // Official 12 distributor records from the distributor
  // // specification PDF.
  // //
  // // Behaviour:
  // // 1. Admin Panel data available -> display Admin data.
  // // 2. Admin Panel empty/unavailable -> display these 12.
  // // ======================================================

  // const FALLBACK_DISTRIBUTORS = [
  //   {
  //     id: "ccmatting-ireland-uk",
  //     companyName: "CCMatting Ireland & UK",
  //     country: "Ireland & United Kingdom",
  //     region: "Europe",
  //     location: "Ireland & United Kingdom",
  //     city: "",
  //     state: "",
  //     postalCode: "",
  //     emails: [
  //       "sales@ccmatting.ie",
  //       "sales@ccmatting.co.uk",
  //     ],
  //     phone: "",
  //     phoneDisplay: "N/A (General Sales)",
  //     website: "ccmatting.ie",
  //     flag: "🇮🇪",
  //   },

  //   {
  //     id: "iab-reinraum-produkte",
  //     companyName: "IAB Reinraum-Produkte GmbH",
  //     country: "Germany",
  //     region: "Europe",
  //     location:
  //       "Braunschweig, Niedersachsen, Deutschland - 38126",
  //     city: "Braunschweig",
  //     state: "Niedersachsen",
  //     postalCode: "38126",
  //     emails: [
  //       "info@iab-bs.de",
  //       "warmuth@iab-bs.de",
  //     ],
  //     phone: "+49 531 28484 0",
  //     phoneDisplay: "+49 531 28484 0",
  //     website: "www.iab-reinraumprodukte.de",
  //     flag: "🇩🇪",
  //   },

  //   {
  //     id: "acumen-technology",
  //     companyName: "Acumen Technology",
  //     country: "United States of America",
  //     region: "North America",
  //     location:
  //       "Blaine, Minnesota, United States - 55449",
  //     city: "Blaine",
  //     state: "Minnesota",
  //     postalCode: "55449",
  //     emails: [
  //       "darik@acumentech.biz",
  //     ],
  //     phone: "16127602653",
  //     phoneDisplay: "16127602653",
  //     website: "www.acumentech.biz",
  //     flag: "🇺🇸",
  //   },

  //   {
  //     id: "sinar-global-hygiene",
  //     companyName:
  //       "Sinar Global Hygiene (M) Sdn Bhd",
  //     country: "Malaysia",
  //     region: "Asia",
  //     location:
  //       "Kuala Lumpur, Malaysia - 51100",
  //     city: "Kuala Lumpur",
  //     state: "",
  //     postalCode: "51100",
  //     emails: [
  //       "ccmatting@sghygiene.com.my",
  //       "roy@sghygiene.com.my",
  //     ],
  //     phone: "+60 126 494 786",
  //     phoneDisplay: "+60 126 494 786",
  //     website: "sghygiene.com.my",
  //     flag: "🇲🇾",
  //   },

  //   {
  //     id: "aptaclean-solutions",
  //     companyName:
  //       "Aptaclean Solutions Pvt. Ltd.",
  //     country: "India",
  //     region: "Asia",
  //     location:
  //       "Nagpur, Maharashtra, India - 440013",
  //     city: "Nagpur",
  //     state: "Maharashtra",
  //     postalCode: "440013",
  //     emails: [
  //       "sales@aptaclean.com",
  //       "imran@aptaclean.com",
  //     ],
  //     phone: "+91-9145066312",
  //     phoneDisplay: "+91-9145066312",
  //     website: "aptaclean.com",
  //     flag: "🇮🇳",
  //   },

  //   {
  //     id: "clerity",
  //     companyName: "Clerity",
  //     country: "South Africa",
  //     region: "Africa",
  //     location:
  //       "Johannesburg, Gauteng, South Africa - 2196",
  //     city: "Johannesburg",
  //     state: "Gauteng",
  //     postalCode: "2196",
  //     emails: [
  //       "sascha@clerity.co.za",
  //       "sascha@basan.co.za",
  //     ],
  //     phone: "+27105940307",
  //     phoneDisplay: "+27105940307",
  //     website: "www.clerity.co.za",
  //     flag: "🇿🇦",
  //   },

  //   {
  //     id: "ermin",
  //     companyName: "Ermin Ltd.",
  //     country: "Czech Republic",
  //     region: "Europe",
  //     location:
  //       "Prague 6, Czech Republic - 16400",
  //     city: "Prague 6",
  //     state: "",
  //     postalCode: "16400",
  //     emails: [
  //       "info@ermin.cz",
  //       "hruby@ermin.cz",
  //     ],
  //     phone: "+420605214882",
  //     phoneDisplay: "+420605214882",
  //     website: "www.ermin.cz",
  //     flag: "🇨🇿",
  //   },

  //   {
  //     id: "cleanhub-plus",
  //     companyName: "CleanHub+",
  //     country: "Spain",
  //     region: "Europe",
  //     location:
  //       "Molins de Rei, Barcelona, España - 08750",
  //     city: "Molins de Rei",
  //     state: "Barcelona",
  //     postalCode: "08750",
  //     emails: [
  //       "leads@cleanhubplus.com",
  //     ],
  //     phone: "+34 934 739 137",
  //     phoneDisplay: "+34 934 739 137",
  //     website: "cleanhubplus.com",
  //     flag: "🇪🇸",
  //   },

  //   {
  //     id: "sevenseas-industrial",
  //     companyName:
  //       "SEVENSEAS INDUSTRIAL INNOVATION SRL",
  //     country: "Romania",
  //     region: "Europe",
  //     location:
  //       "Brasov, Romania - 500173",
  //     city: "Brasov",
  //     state: "",
  //     postalCode: "500173",
  //     emails: [
  //       "info@sevenseas.ro",
  //       "levente.brok@sevenseas.ro",
  //     ],
  //     phone: "+40 368 883 026",
  //     phoneDisplay: "+40 368 883 026",
  //     website: "sevenseas.ro",
  //     flag: "🇷🇴",
  //   },

  //   {
  //     id: "tophygiene",
  //     companyName: "TopHygiene Oy",
  //     country: "Finland",
  //     region: "Europe",
  //     location:
  //       "Iltasmäki, Pirkanmaa, Finland - 36640",
  //     city: "Iltasmäki",
  //     state: "Pirkanmaa",
  //     postalCode: "36640",
  //     emails: [
  //       "raafael.uotila@tophygiene.fi",
  //     ],
  //     phone: "+358400565143",
  //     phoneDisplay: "+358400565143",
  //     website: "www.tophygiene.fi",
  //     flag: "🇫🇮",
  //   },

  //   {
  //     id: "vimat",
  //     companyName: "Vimat",
  //     country: "Costa Rica",
  //     region: "North America",
  //     location:
  //       "La Guacima, Alajuela, Costa Rica - 20105",
  //     city: "La Guacima",
  //     state: "Alajuela",
  //     postalCode: "20105",
  //     emails: [
  //       "amurillo@vimat.net",
  //     ],
  //     phone: "+506 88280833",
  //     phoneDisplay: "+506 88280833",
  //     website: "www.vimat.net",
  //     flag: "🇨🇷",
  //   },

  //   {
  //     id: "mongar-solutions",
  //     companyName:
  //       "MONGAR SOLUTIONS SA DE CV",
  //     country: "Mexico",
  //     region: "North America",
  //     location:
  //       "Zapopan, Jalisco, Mexico - 45140",
  //     city: "Zapopan",
  //     state: "Jalisco",
  //     postalCode: "45140",
  //     emails: [
  //       "rc@cleanfactory.com",
  //       "compras@cleanfactory.com",
  //     ],
  //     phone: "+523331893763",
  //     phoneDisplay: "+523331893763",
  //     website: "cleanfactory.com",
  //     flag: "🇲🇽",
  //   },
  // ];

  // // ======================================================
  // // REGION LIST
  // // ======================================================

  // const REGIONS = [
  //   "All Regions",
  //   "Europe",
  //   "Asia",
  //   "Africa",
  //   "North America",
  // ];

  // // ======================================================
  // // NORMALIZE ADMIN DATA
  // // ======================================================

  // function normalizeDistributor(item, index) {
  //   if (!item || typeof item !== "object") {
  //     return null;
  //   }

  //   // ----------------------------------------------------
  //   // EMAILS
  //   // ----------------------------------------------------

  //   let emails = [];

  //   if (Array.isArray(item.emails)) {
  //     emails = item.emails.filter(Boolean);
  //   } else if (Array.isArray(item.email)) {
  //     emails = item.email.filter(Boolean);
  //   } else if (typeof item.email === "string") {
  //     emails = item.email
  //       .split(/[|,;]/)
  //       .map((email) => email.trim())
  //       .filter(Boolean);
  //   }

  //   // ----------------------------------------------------
  //   // COUNTRY
  //   // ----------------------------------------------------

  //   const country =
  //     item.country ||
  //     item.countryName ||
  //     item.location?.country ||
  //     "";

  //   // ----------------------------------------------------
  //   // COMPANY
  //   // ----------------------------------------------------

  //   const companyName =
  //     item.companyName ||
  //     item.company ||
  //     item.name ||
  //     `Distributor ${index + 1}`;

  //   // ----------------------------------------------------
  //   // LOCATION
  //   // ----------------------------------------------------

  //   let location = "";

  //   if (typeof item.location === "string") {
  //     location = item.location;
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

  //   let website =
  //     item.website ||
  //     item.websiteUrl ||
  //     item.url ||
  //     "";

  //   if (
  //     website &&
  //     !website.startsWith("http://") &&
  //     !website.startsWith("https://")
  //   ) {
  //     website = `https://${website}`;
  //   }

  //   // ----------------------------------------------------
  //   // PHONE
  //   // ----------------------------------------------------

  //   const phone =
  //     item.phone ||
  //     item.phoneNumber ||
  //     "";

  //   // ----------------------------------------------------
  //   // RETURN NORMALIZED OBJECT
  //   // ----------------------------------------------------

  //   return {
  //     id:
  //       item._id ||
  //       item.id ||
  //       `admin-distributor-${index}`,

  //     companyName,

  //     country,

  //     region:
  //       item.region ||
  //       item.continent ||
  //       detectRegion(country),

  //     location,

  //     city: item.city || "",
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

  //     flag:
  //       item.flag ||
  //       getCountryFlag(country),
  //   };
  // }

  // // ======================================================
  // // REGION DETECTION
  // // ======================================================

  // function detectRegion(country = "") {
  //   const value = country.toLowerCase();

  //   // Europe

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
  //     ].some((item) =>
  //       value.includes(item)
  //     )
  //   ) {
  //     return "Europe";
  //   }

  //   // Asia

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
  //     ].some((item) =>
  //       value.includes(item)
  //     )
  //   ) {
  //     return "Asia";
  //   }

  //   // Africa

  //   if (
  //     [
  //       "south africa",
  //       "africa",
  //       "nigeria",
  //       "kenya",
  //       "egypt",
  //     ].some((item) =>
  //       value.includes(item)
  //     )
  //   ) {
  //     return "Africa";
  //   }

  //   // North America

  //   if (
  //     [
  //       "united states",
  //       "usa",
  //       "america",
  //       "mexico",
  //       "costa rica",
  //       "canada",
  //     ].some((item) =>
  //       value.includes(item)
  //     )
  //   ) {
  //     return "North America";
  //   }

  //   return "Other";
  // }

  // // ======================================================
  // // COUNTRY FLAG
  // // ======================================================

  // function getCountryFlag(country = "") {
  //   const value = country.toLowerCase();

  //   if (value.includes("ireland")) {
  //     return "🇮🇪";
  //   }

  //   if (value.includes("germany")) {
  //     return "🇩🇪";
  //   }

  //   if (
  //     value.includes("united states") ||
  //     value.includes("usa") ||
  //     value.includes("america")
  //   ) {
  //     return "🇺🇸";
  //   }

  //   if (value.includes("malaysia")) {
  //     return "🇲🇾";
  //   }

  //   if (value.includes("india")) {
  //     return "🇮🇳";
  //   }

  //   if (value.includes("south africa")) {
  //     return "🇿🇦";
  //   }

  //   if (value.includes("czech")) {
  //     return "🇨🇿";
  //   }

  //   if (value.includes("spain")) {
  //     return "🇪🇸";
  //   }

  //   if (value.includes("romania")) {
  //     return "🇷🇴";
  //   }

  //   if (value.includes("finland")) {
  //     return "🇫🇮";
  //   }

  //   if (value.includes("costa rica")) {
  //     return "🇨🇷";
  //   }

  //   if (value.includes("mexico")) {
  //     return "🇲🇽";
  //   }

  //   return "🌍";
  // }

  // // ======================================================
  // // WEBSITE URL
  // // ======================================================

  // function getWebsiteUrl(website = "") {
  //   if (!website) {
  //     return "";
  //   }

  //   if (
  //     website.startsWith("http://") ||
  //     website.startsWith("https://")
  //   ) {
  //     return website;
  //   }

  //   return `https://${website}`;
  // }

  // // ======================================================
  // // MAIN COMPONENT
  // // ======================================================

  // export default function DistributorPage() {
  //   const api = useApiClient();

  //   const [search, setSearch] = useState("");
  //   const [selectedRegion, setSelectedRegion] =
  //     useState("All Regions");

  //   // ====================================================
  //   // ADMIN API
  //   // ====================================================
  //   //
  //   // Admin data has priority.
  //   //
  //   // If the API returns:
  //   // - empty array
  //   // - no data
  //   // - unavailable response
  //   //
  //   // then FALLBACK_DISTRIBUTORS are displayed.
  //   // ====================================================

  //   const distributorsQuery = api.useGet(
  //     "distributors",
  //     "/distributors"
  //   );

  //   // ====================================================
  //   // NORMALIZE ADMIN DATA
  //   // ====================================================

  //   const adminDistributors = useMemo(() => {
  //     const response =
  //       distributorsQuery?.data;

  //     if (!response) {
  //       return [];
  //     }

  //     let data = [];

  //     // Direct array

  //     if (Array.isArray(response)) {
  //       data = response;
  //     }

  //     // { data: [] }

  //     else if (
  //       Array.isArray(response?.data)
  //     ) {
  //       data = response.data;
  //     }

  //     // { distributors: [] }

  //     else if (
  //       Array.isArray(
  //         response?.distributors
  //       )
  //     ) {
  //       data = response.distributors;
  //     }

  //     // { data: { distributors: [] } }

  //     else if (
  //       Array.isArray(
  //         response?.data?.distributors
  //       )
  //     ) {
  //       data =
  //         response.data.distributors;
  //     }

  //     // { results: [] }

  //     else if (
  //       Array.isArray(response?.results)
  //     ) {
  //       data = response.results;
  //     }

  //     return data
  //       .map(normalizeDistributor)
  //       .filter(Boolean)
  //       .filter(
  //         (item) =>
  //           item.companyName &&
  //           item.companyName.trim()
  //       );
  //   }, [distributorsQuery?.data]);

  //   // ====================================================
  //   // FINAL DATA SOURCE
  //   // ====================================================

  //   const distributors =
  //     adminDistributors.length > 0
  //       ? adminDistributors
  //       : FALLBACK_DISTRIBUTORS;

  //   const isUsingFallback =
  //     adminDistributors.length === 0;

  //   // ====================================================
  //   // FILTERED DATA
  //   // ====================================================

  //   const filteredDistributors = useMemo(() => {
  //     const searchValue =
  //       search.trim().toLowerCase();

  //     return distributors.filter(
  //       (distributor) => {
  //         const searchableText = [
  //           distributor.companyName,
  //           distributor.country,
  //           distributor.region,
  //           distributor.location,
  //           distributor.city,
  //           distributor.state,
  //           distributor.postalCode,
  //           distributor.phone,
  //           ...(distributor.emails || []),
  //           distributor.website,
  //         ]
  //           .filter(Boolean)
  //           .join(" ")
  //           .toLowerCase();

  //         const matchesSearch =
  //           !searchValue ||
  //           searchableText.includes(
  //             searchValue
  //           );

  //         const matchesRegion =
  //           selectedRegion ===
  //             "All Regions" ||
  //           distributor.region ===
  //             selectedRegion;

  //         return (
  //           matchesSearch &&
  //           matchesRegion
  //         );
  //       }
  //     );
  //   }, [
  //     distributors,
  //     search,
  //     selectedRegion,
  //   ]);

  //   // ====================================================
  //   // LOADING
  //   // ====================================================

  //   const isLoading =
  //     distributorsQuery?.isLoading &&
  //     !distributorsQuery?.isError &&
  //     !distributorsQuery?.data;

  //   // ====================================================
  //   // UI
  //   // ====================================================

  //   return (
  //     <>
  //       <main className="min-h-screen bg-[#F1F4FC]">
  //         {/* ==================================================
  //             HERO
  //         ================================================== */}

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
  //                 gap-10
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
  //                     <UsersIcon className="h-4 w-4" />
  //                   </span>

  //                   Global Network
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
  //                   Our Global

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
  //                       <UsersIcon className="h-5 w-5" />
  //                     </div>

  //                     <div>
  //                       <p className="text-xl font-bold">
  //                         {distributors.length}
  //                       </p>

  //                       <p className="text-xs text-white/60">
  //                         Distribution Partners
  //                       </p>
  //                     </div>
  //                   </div>

  //                   {/* Global */}

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
  //                       <GlobeAltIcon className="h-5 w-5" />
  //                     </div>

  //                     <div>
  //                       <p className="text-xl font-bold">
  //                         Global
  //                       </p>

  //                       <p className="text-xs text-white/60">
  //                         International Coverage
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               {/* RIGHT HERO CARD */}

  //               <div
  //                 className="
  //                   hidden
  //                   lg:flex
  //                   justify-center
  //                   items-center
  //                 "
  //               >
  //                 <div
  //                   className="
  //                     relative
  //                     w-full
  //                     max-w-[370px]
  //                   "
  //                 >
  //                   <div
  //                     className="
  //                       absolute
  //                       inset-0
  //                       rounded-[32px]
  //                       bg-white/10
  //                       blur-2xl
  //                     "
  //                   />

  //                   <div
  //                     className="
  //                       relative
  //                       rounded-[32px]
  //                       border
  //                       border-white/20
  //                       bg-white/[0.10]
  //                       backdrop-blur-xl
  //                       p-7
  //                       shadow-2xl
  //                     "
  //                   >
  //                     <div
  //                       className="
  //                         flex
  //                         h-16
  //                         w-16
  //                         items-center
  //                         justify-center
  //                         rounded-2xl
  //                         bg-white
  //                         text-[#173DB8]
  //                         shadow-lg
  //                       "
  //                     >
  //                       <GlobeAltIcon className="h-8 w-8" />
  //                     </div>

  //                     <h2
  //                       className="
  //                         mt-6
  //                         text-2xl
  //                         font-bold
  //                       "
  //                     >
  //                       Find a distributor
  //                     </h2>

  //                     <p
  //                       className="
  //                         mt-3
  //                         text-sm
  //                         leading-6
  //                         text-white/70
  //                       "
  //                     >
  //                       Search by company,
  //                       country, city or region
  //                       to quickly find the right
  //                       CC Matting partner.
  //                     </p>

  //                     <div className="mt-7 space-y-3">
  //                       {[
  //                         "Local product support",
  //                         "Expert contamination control advice",
  //                         "Regional distribution network",
  //                       ].map((item) => (
  //                         <div
  //                           key={item}
  //                           className="
  //                             flex
  //                             items-center
  //                             gap-3
  //                             text-sm
  //                             text-white/80
  //                           "
  //                         >
  //                           <CheckCircleIcon
  //                             className="
  //                               h-5
  //                               w-5
  //                               shrink-0
  //                               text-[#AFC0FF]
  //                             "
  //                           />

  //                           {item}
  //                         </div>
  //                       ))}
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </section>

  //         {/* ==================================================
  //             DISTRIBUTOR CONTENT
  //         ================================================== */}

  //         <section
  //           className="
  //             max-w-7xl
  //             mx-auto
  //             px-4
  //             sm:px-6
  //             lg:px-8
  //             py-10
  //             sm:py-14
  //           "
  //         >
  //           {/* ==================================================
  //               SEARCH / FILTER
  //           ================================================== */}

  //           <div
  //             className="
  //               sticky
  //               top-2
  //               z-20
  //               mb-10
  //             "
  //           >
  //             <div
  //               className="
  //                 rounded-3xl
  //                 border
  //                 border-[#DDE3F2]
  //                 bg-white/95
  //                 backdrop-blur-xl
  //                 p-4
  //                 sm:p-5
  //                 shadow-lg
  //               "
  //             >
  //               <div
  //                 className="
  //                   flex
  //                   flex-col
  //                   lg:flex-row
  //                   gap-3
  //                 "
  //               >
  //                 {/* SEARCH */}

  //                 <div className="relative flex-1">
  //                   <MagnifyingGlassIcon
  //                     className="
  //                       absolute
  //                       left-4
  //                       top-1/2
  //                       -translate-y-1/2
  //                       h-5
  //                       w-5
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
  //                     placeholder="Search by company, country, city or keyword..."
  //                     className="
  //                       w-full
  //                       h-13
  //                       rounded-2xl
  //                       border
  //                       border-[#D8DFEF]
  //                       bg-white
  //                       pl-12
  //                       pr-4
  //                       text-[#151515]
  //                       outline-none
  //                       transition
  //                       placeholder:text-[#9CA1AC]
  //                       focus:border-[#173DB8]
  //                       focus:ring-4
  //                       focus:ring-[#173DB8]/10
  //                     "
  //                   />
  //                 </div>

  //                 {/* REGION */}

  //                 <div
  //                   className="
  //                     relative
  //                     lg:w-[230px]
  //                   "
  //                 >
  //                   <select
  //                     value={selectedRegion}
  //                     onChange={(event) =>
  //                       setSelectedRegion(
  //                         event.target.value
  //                       )
  //                     }
  //                     className="
  //                       appearance-none
  //                       w-full
  //                       h-13
  //                       rounded-2xl
  //                       border
  //                       border-[#D8DFEF]
  //                       bg-white
  //                       px-4
  //                       pr-11
  //                       text-[#30343B]
  //                       font-medium
  //                       outline-none
  //                       cursor-pointer
  //                       transition
  //                       focus:border-[#173DB8]
  //                       focus:ring-4
  //                       focus:ring-[#173DB8]/10
  //                     "
  //                   >
  //                     {REGIONS.map((region) => (
  //                       <option
  //                         key={region}
  //                         value={region}
  //                       >
  //                         {region}
  //                       </option>
  //                     ))}
  //                   </select>

  //                   <ChevronDownIcon
  //                     className="
  //                       absolute
  //                       right-4
  //                       top-1/2
  //                       -translate-y-1/2
  //                       h-5
  //                       w-5
  //                       text-[#173DB8]
  //                       pointer-events-none
  //                     "
  //                   />
  //                 </div>
  //               </div>

  //               {/* RESULT COUNT */}

  //               <div
  //                 className="
  //                   mt-3
  //                   flex
  //                   flex-wrap
  //                   items-center
  //                   justify-between
  //                   gap-2
  //                   px-1
  //                 "
  //               >
  //                 <p
  //                   className="
  //                     text-sm
  //                     text-[#737987]
  //                   "
  //                 >
  //                   Showing{" "}
  //                   <span
  //                     className="
  //                       font-bold
  //                       text-[#173DB8]
  //                     "
  //                   >
  //                     {filteredDistributors.length}
  //                   </span>{" "}
  //                   of{" "}
  //                   <span className="font-semibold">
  //                     {distributors.length}
  //                   </span>{" "}
  //                   distributors
  //                 </p>

  //                 {(search ||
  //                   selectedRegion !==
  //                     "All Regions") && (
  //                   <button
  //                     type="button"
  //                     onClick={() => {
  //                       setSearch("");
  //                       setSelectedRegion(
  //                         "All Regions"
  //                       );
  //                     }}
  //                     className="
  //                       text-sm
  //                       font-semibold
  //                       text-[#173DB8]
  //                       hover:underline
  //                     "
  //                   >
  //                     Clear filters
  //                   </button>
  //                 )}
  //               </div>
  //             </div>
  //           </div>

  //           {/* ==================================================
  //               LOADING
  //           ================================================== */}

  //           {isLoading && (
  //             <div
  //               className="
  //                 grid
  //                 grid-cols-1
  //                 md:grid-cols-2
  //                 xl:grid-cols-3
  //                 gap-6
  //               "
  //             >
  //               {Array.from({
  //                 length: 6,
  //               }).map((_, index) => (
  //                 <div
  //                   key={index}
  //                   className="
  //                     h-[390px]
  //                     rounded-3xl
  //                     bg-white
  //                     border
  //                     border-[#DDE3F2]
  //                     animate-pulse
  //                   "
  //                 />
  //               ))}
  //             </div>
  //           )}

  //           {/* ==================================================
  //               DISTRIBUTOR GRID
  //           ================================================== */}

  //           {!isLoading &&
  //             filteredDistributors.length > 0 && (
  //               <div
  //                 className="
  //                   grid
  //                   grid-cols-1
  //                   md:grid-cols-2
  //                   xl:grid-cols-3
  //                   gap-6
  //                 "
  //               >
  //                 {filteredDistributors.map(
  //                   (distributor, index) => (
  //                     <DistributorCard
  //                       key={
  //                         distributor.id ||
  //                         index
  //                       }
  //                       distributor={
  //                         distributor
  //                       }
  //                     />
  //                   )
  //                 )}
  //               </div>
  //             )}

  //           {/* ==================================================
  //               NO RESULTS
  //           ================================================== */}

  //           {!isLoading &&
  //             filteredDistributors.length ===
  //               0 && (
  //               <div
  //                 className="
  //                   rounded-3xl
  //                   border
  //                   border-[#DDE3F2]
  //                   bg-white
  //                   px-6
  //                   py-16
  //                   text-center
  //                   shadow-sm
  //                 "
  //               >
  //                 <div
  //                   className="
  //                     mx-auto
  //                     flex
  //                     h-16
  //                     w-16
  //                     items-center
  //                     justify-center
  //                     rounded-2xl
  //                     bg-[#EAF0FF]
  //                     text-[#173DB8]
  //                   "
  //                 >
  //                   <MagnifyingGlassIcon
  //                     className="h-8 w-8"
  //                   />
  //                 </div>

  //                 <h2
  //                   className="
  //                     mt-6
  //                     text-2xl
  //                     font-bold
  //                     text-[#151515]
  //                   "
  //                 >
  //                   No distributors found
  //                 </h2>

  //                 <p
  //                   className="
  //                     mt-2
  //                     text-[#737987]
  //                   "
  //                 >
  //                   Try searching with another
  //                   company, country, city or
  //                   region.
  //                 </p>

  //                 <button
  //                   type="button"
  //                   onClick={() => {
  //                     setSearch("");
  //                     setSelectedRegion(
  //                       "All Regions"
  //                     );
  //                   }}
  //                   className="
  //                     mt-6
  //                     rounded-xl
  //                     bg-[#173DB8]
  //                     px-6
  //                     py-3
  //                     font-semibold
  //                     text-white
  //                     transition
  //                     hover:bg-[#102A8A]
  //                   "
  //                 >
  //                   View All Distributors
  //                 </button>
  //               </div>
  //             )}

  //           {/* ==================================================
  //               FALLBACK NOTICE
  //           ================================================== */}

  //           {isUsingFallback &&
  //             !isLoading && (
  //               <div
  //                 className="
  //                   mt-8
  //                   flex
  //                   items-start
  //                   gap-3
  //                   rounded-2xl
  //                   border
  //                   border-[#DDE3F2]
  //                   bg-white
  //                   px-4
  //                   py-4
  //                   shadow-sm
  //                 "
  //               >
  //                 <CheckCircleIcon
  //                   className="
  //                     mt-0.5
  //                     h-5
  //                     w-5
  //                     shrink-0
  //                     text-[#173DB8]
  //                   "
  //                 />

  //                 <p
  //                   className="
  //                     text-sm
  //                     leading-6
  //                     text-[#606673]
  //                   "
  //                 >
  //                   Showing the verified global
  //                   distributor information.
  //                 </p>
  //               </div>
  //             )}
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

  //   const websiteUrl =
  //     getWebsiteUrl(website);

  //   const phoneHref = phone
  //     ? `tel:${phone.replace(
  //         /[^\d+]/g,
  //         ""
  //       )}`
  //     : "";

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

  //       <div className="flex flex-1 flex-col p-6">
  //         {/* COUNTRY */}

  //         <div
  //           className="
  //             flex
  //             items-start
  //             justify-between
  //             gap-3
  //           "
  //         >
  //           <div
  //             className="
  //               inline-flex
  //               max-w-[85%]
  //               items-center
  //               gap-2
  //               rounded-full
  //               bg-[#EAF0FF]
  //               px-3
  //               py-1.5
  //               text-xs
  //               font-bold
  //               text-[#173DB8]
  //             "
  //           >
  //             <span className="text-base">
  //               {flag || "🌍"}
  //             </span>

  //             <span className="truncate">
  //               {country ||
  //                 "International"}
  //             </span>
  //           </div>

  //           {region && (
  //             <span
  //               className="
  //                 shrink-0
  //                 rounded-full
  //                 bg-[#F5F6FA]
  //                 px-2.5
  //                 py-1
  //                 text-[11px]
  //                 font-semibold
  //                 text-[#737987]
  //               "
  //             >
  //               {region}
  //             </span>
  //           )}
  //         </div>

  //         {/* COMPANY */}

  //         <h2
  //           className="
  //             mt-5
  //             text-xl
  //             font-bold
  //             leading-7
  //             text-[#151515]
  //             transition
  //             group-hover:text-[#173DB8]
  //           "
  //         >
  //           {companyName}
  //         </h2>

  //         {/* DIVIDER */}

  //         <div
  //           className="
  //             my-5
  //             h-px
  //             bg-[#E8ECF5]
  //           "
  //         />

  //         {/* LOCATION */}

  //         <ContactRow
  //           icon={
  //             <MapPinIcon className="h-5 w-5" />
  //           }
  //           label="Location"
  //         >
  //           <span
  //             className="
  //               break-words
  //               text-[#30343B]
  //             "
  //           >
  //             {location ||
  //               "Location not available"}
  //           </span>
  //         </ContactRow>

  //         {/* PHONE */}

  //         <ContactRow
  //           icon={
  //             <PhoneIcon className="h-5 w-5" />
  //           }
  //           label="Phone"
  //         >
  //           {phone ? (
  //             <a
  //               href={phoneHref}
  //               className="
  //                 break-all
  //                 text-[#30343B]
  //                 transition
  //                 hover:text-[#173DB8]
  //                 hover:underline
  //               "
  //             >
  //               {phoneDisplay || phone}
  //             </a>
  //           ) : (
  //             <span
  //               className="
  //                 text-[#737987]
  //               "
  //             >
  //               {phoneDisplay ||
  //                 "N/A"}
  //             </span>
  //           )}
  //         </ContactRow>

  //         {/* EMAILS */}

  //         {emails.length > 0 && (
  //           <ContactRow
  //             icon={
  //               <EnvelopeIcon className="h-5 w-5" />
  //             }
  //             label={
  //               emails.length > 1
  //                 ? "Emails"
  //                 : "Email"
  //             }
  //           >
  //             <div className="space-y-1.5">
  //               {emails.map(
  //                 (email, emailIndex) => (
  //                   <a
  //                     key={`${email}-${emailIndex}`}
  //                     href={`mailto:${email}`}
  //                     className="
  //                       block
  //                       break-all
  //                       text-[#30343B]
  //                       transition
  //                       hover:text-[#173DB8]
  //                       hover:underline
  //                     "
  //                   >
  //                     {email}
  //                   </a>
  //                 )
  //               )}
  //             </div>
  //           </ContactRow>
  //         )}

  //         {/* WEBSITE */}

  //         {website && (
  //           <ContactRow
  //             icon={
  //               <GlobeAltIcon className="h-5 w-5" />
  //             }
  //             label="Website"
  //           >
  //             <a
  //               href={websiteUrl}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="
  //                 inline-flex
  //                 max-w-full
  //                 items-start
  //                 gap-1.5
  //                 break-all
  //                 text-[#173DB8]
  //                 font-medium
  //                 hover:underline
  //               "
  //             >
  //               <span>
  //                 {website
  //                   .replace(
  //                     /^https?:\/\//,
  //                     ""
  //                   )
  //                   .replace(
  //                     /\/$/,
  //                     ""
  //                   )}
  //               </span>

  //               <ArrowTopRightOnSquareIcon
  //                 className="
  //                   mt-0.5
  //                   h-4
  //                   w-4
  //                   shrink-0
  //                 "
  //               />
  //             </a>
  //           </ContactRow>
  //         )}

  //         {/* SPACER */}

  //         <div className="flex-1" />
  //       </div>

  //       {/* ==================================================
  //           CARD FOOTER
  //       ================================================== */}

  //       <div
  //         className="
  //           border-t
  //           border-[#E8ECF5]
  //           bg-[#FAFBFE]
  //           px-6
  //           py-4
  //         "
  //       >
  //         <div
  //           className="
  //             flex
  //             items-center
  //             gap-2
  //             text-xs
  //             font-semibold
  //             text-[#737987]
  //           "
  //         >
  //           <span
  //             className="
  //               h-2
  //               w-2
  //               rounded-full
  //               bg-[#173DB8]
  //             "
  //           />

  //           CC Matting Distribution Partner
  //         </div>
  //       </div>
  //     </article>
  //   );
  // }

  // // ======================================================
  // // CONTACT ROW
  // // ======================================================

  // function ContactRow({
  //   icon,
  //   label,
  //   children,
  // }) {
  //   return (
  //     <div
  //       className="
  //         mb-4
  //         flex
  //         items-start
  //         gap-3
  //       "
  //     >
  //       {/* ICON */}

  //       <div
  //         className="
  //           flex
  //           h-9
  //           w-9
  //           shrink-0
  //           items-center
  //           justify-center
  //           rounded-xl
  //           bg-[#EAF0FF]
  //           text-[#173DB8]
  //         "
  //       >
  //         {icon}
  //       </div>

  //       {/* CONTENT */}

  //       <div
  //         className="
  //           min-w-0
  //           flex-1
  //         "
  //       >
  //         <p
  //           className="
  //             mb-1
  //             text-[11px]
  //             font-semibold
  //             uppercase
  //             tracking-wide
  //             text-[#8A909D]
  //           "
  //         >
  //           {label}
  //         </p>

  //         <div
  //           className="
  //             text-sm
  //             leading-5
  //           "
  //         >
  //           {children}
  //         </div>
  //       </div>
  //     </div>
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
  // COUNTRY FLAG
  // ======================================================

  function getCountryFlag(country = "") {
    const value =
      String(country).toLowerCase();

    if (
      value.includes("ireland")
    ) {
      return "🇮🇪";
    }

    if (
      value.includes("germany")
    ) {
      return "🇩🇪";
    }

    if (
      value.includes("united states") ||
      value.includes("usa") ||
      value.includes("america")
    ) {
      return "🇺🇸";
    }

    if (
      value.includes("malaysia")
    ) {
      return "🇲🇾";
    }

    if (
      value.includes("india")
    ) {
      return "🇮🇳";
    }

    if (
      value.includes("south africa")
    ) {
      return "🇿🇦";
    }

    if (
      value.includes("czech")
    ) {
      return "🇨🇿";
    }

    if (
      value.includes("spain")
    ) {
      return "🇪🇸";
    }

    if (
      value.includes("romania")
    ) {
      return "🇷🇴";
    }

    if (
      value.includes("finland")
    ) {
      return "🇫🇮";
    }

    if (
      value.includes("costa rica")
    ) {
      return "🇨🇷";
    }

    if (
      value.includes("mexico")
    ) {
      return "🇲🇽";
    }

    return "🌍";
  }

  // ======================================================
  // REGION DETECTION
  // ======================================================

  function detectRegion(country = "") {
    const value =
      String(country).toLowerCase();

    // ----------------------------------------------------
    // EUROPE
    // ----------------------------------------------------

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
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "Europe";
    }

    // ----------------------------------------------------
    // ASIA
    // ----------------------------------------------------

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
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "Asia";
    }

    // ----------------------------------------------------
    // AFRICA
    // ----------------------------------------------------

    if (
      [
        "south africa",
        "africa",
        "nigeria",
        "kenya",
        "egypt",
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "Africa";
    }

    // ----------------------------------------------------
    // NORTH AMERICA
    // ----------------------------------------------------

    if (
      [
        "united states",
        "usa",
        "america",
        "mexico",
        "costa rica",
        "canada",
      ].some((item) =>
        value.includes(item)
      )
    ) {
      return "North America";
    }

    return "Other";
  }

  // ======================================================
  // WEBSITE URL
  // ======================================================

  function getWebsiteUrl(
    website = ""
  ) {
    if (!website) {
      return "";
    }

    if (
      website.startsWith(
        "http://"
      ) ||
      website.startsWith(
        "https://"
      )
    ) {
      return website;
    }

    return `https://${website}`;
  }

  // ======================================================
  // NORMALIZE DISTRIBUTOR
  // ======================================================

  function normalizeDistributor(
    item,
    index
  ) {
    if (!item) {
      return null;
    }

    // ----------------------------------------------------
    // COUNTRY
    // ----------------------------------------------------

    const country =
      item.country ||
      "International";

    // ----------------------------------------------------
    // COMPANY
    // ----------------------------------------------------

    const companyName =
      item.companyName ||
      item.company ||
      item.name ||
      "";

    if (!companyName.trim()) {
      return null;
    }

    // ----------------------------------------------------
    // EMAILS
    // ----------------------------------------------------

    let emails = [];

    if (
      Array.isArray(item.emails)
    ) {
      emails = item.emails
        .map((email) =>
          String(email).trim()
        )
        .filter(Boolean);
    } else if (
      typeof item.emails ===
      "string"
    ) {
      emails = item.emails
        .split(
          /[,;|]/
        )
        .map((email) =>
          email.trim()
        )
        .filter(Boolean);
    } else if (
      item.email
    ) {
      emails = [
        String(item.email).trim(),
      ].filter(Boolean);
    }

    // ----------------------------------------------------
    // LOCATION
    // ----------------------------------------------------

    let location = "";

    if (
      typeof item.location ===
      "string"
    ) {
      location =
        item.location.trim();
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

    // ----------------------------------------------------
    // WEBSITE
    // ----------------------------------------------------

    const website =
      item.website ||
      item.websiteUrl ||
      item.url ||
      "";

    // ----------------------------------------------------
    // PHONE
    // ----------------------------------------------------

    const phone =
      item.phone ||
      item.phoneNumber ||
      "";

    // ----------------------------------------------------
    // REGION
    // ----------------------------------------------------

    const region =
      item.region ||
      item.continent ||
      detectRegion(country);

    // ----------------------------------------------------
    // FLAG
    // ----------------------------------------------------

    const flag =
      item.flag ||
      getCountryFlag(country);

    // ----------------------------------------------------
    // RETURN
    // ----------------------------------------------------

    return {
      id:
        item._id ||
        item.id ||
        `admin-distributor-${index}`,

      companyName:
        companyName.trim(),

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
        // API:
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
          .map(
            normalizeDistributor
          )
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
              ...(distributor.emails ||
                []),
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
  <Header/>
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
    {/* Background */}

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

    {/* Content */}

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
          {/* Badge */}

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

          {/* Heading */}

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

          {/* Description */}

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

          {/* Stats */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-4
            "
          >
            {/* Count */}

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

            {/* Worldwide */}

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
                      value={
                        selectedRegion
                      }
                      onChange={(
                        event
                      ) =>
                        setSelectedRegion(
                          event.target
                            .value
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
                            key={
                              region
                            }
                            value={
                              region
                            }
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
            <div
              className="
                mx-auto
                max-w-7xl
              "
            >
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
                        className="
                          h-8
                          w-8
                        "
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
                        className="
                          h-8
                          w-8
                        "
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
                        className="
                          h-8
                          w-8
                        "
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
function DistributorCard({ distributor }) {
  const {
    companyName,
    country,
    region,
    location,
    emails = [],
    phone,
    phoneDisplay,
    website,
    flag,
  } = distributor;

  const websiteUrl = getWebsiteUrl(website);

  const phoneHref = phone
    ? `tel:${phone.replace(/[^\d+]/g, "")}`
    : "";

  // =========================================================
  // PROFESSIONAL FALLBACK TEXT
  // =========================================================

  const displayFlag = flag || "🌍";
  const displayRegion = region || "Global";
  const displayCountry = country || "Country not specified";

  const displayLocation =
    location || "Location not available";

  const hasPhone = Boolean(phone);
  const hasEmails =
    Array.isArray(emails) && emails.length > 0;
  const hasWebsite = Boolean(website);

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
              rounded-xl
              bg-[#F3F6FF]
              text-2xl
            "
          >
            {displayFlag}
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
          {companyName || "Distributor name unavailable"}
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
            <MapPinIcon
              className="
                h-5
                w-5
              "
            />
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
                {location}
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
            <PhoneIcon
              className="
                h-5
                w-5
              "
            />
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
            <EnvelopeIcon
              className="
                h-5
                w-5
              "
            />
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
              <div
                className="
                  mt-1
                  space-y-1
                "
              >
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
            <GlobeAltIcon
              className="
                h-5
                w-5
              "
            />
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