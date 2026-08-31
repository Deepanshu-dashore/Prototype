// "use client";

// import React from "react";

// import {
//   MapPinIcon,
//   PhoneIcon,
//   EnvelopeIcon,
//   GlobeAltIcon,
//   PencilIcon,
//   TrashIcon,
// } from "@heroicons/react/24/outline";

// // ======================================================
// // COMPONENT
// // ======================================================

// export default function DistributorCard({
//   distributor,
//   onEdit,
//   onDelete,
// }) {
//   const {
//     companyName,
//     country,
//     region,
//     location,
//     emails = [],
//     phone,
//     website,
//     flag,
//     status,
//   } = distributor;

//   return (
//     <article
//       className="
//         overflow-hidden
//         rounded-2xl
//         border
//         border-[#DDE3F2]
//         bg-white
//         shadow-sm
//         transition
//         hover:shadow-md
//       "
//     >
//       {/* ==================================================
//           TOP
//       ================================================== */}

//       <div
//         className="
//           flex
//           items-start
//           justify-between
//           gap-4
//           border-b
//           border-[#E8ECF5]
//           p-5
//         "
//       >
//         <div className="min-w-0">
//           <div
//             className="
//               mb-3
//               inline-flex
//               items-center
//               gap-2
//               rounded-full
//               bg-[#EAF0FF]
//               px-3
//               py-1
//               text-xs
//               font-semibold
//               text-[#173DB8]
//             "
//           >
//             <span>
//               {flag || "🌍"}
//             </span>

//             {country}
//           </div>

//           <h3
//             className="
//               break-words
//               text-lg
//               font-bold
//               leading-6
//               text-[#151515]
//             "
//           >
//             {companyName}
//           </h3>

//           {region && (
//             <p
//               className="
//                 mt-1
//                 text-xs
//                 text-[#737987]
//               "
//             >
//               {region}
//             </p>
//           )}
//         </div>

//         {/* ACTIONS */}

//         <div className="flex shrink-0 gap-1">
//           <button
//             type="button"
//             onClick={() =>
//               onEdit?.(distributor)
//             }
//             title="Edit"
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               rounded-lg
//               text-[#173DB8]
//               hover:bg-[#EAF0FF]
//             "
//           >
//             <PencilIcon className="h-4 w-4" />
//           </button>

//           <button
//             type="button"
//             onClick={() =>
//               onDelete?.(distributor)
//             }
//             title="Delete"
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               rounded-lg
//               text-red-500
//               hover:bg-red-50
//             "
//           >
//             <TrashIcon className="h-4 w-4" />
//           </button>
//         </div>
//       </div>

//       {/* ==================================================
//           DETAILS
//       ================================================== */}

//       <div className="space-y-4 p-5">
//         {/* LOCATION */}

//         <DetailRow
//           icon={
//             <MapPinIcon className="h-4 w-4" />
//           }
//         >
//           {location ||
//             "Location not available"}
//         </DetailRow>

//         {/* PHONE */}

//         {phone && (
//           <DetailRow
//             icon={
//               <PhoneIcon className="h-4 w-4" />
//             }
//           >
//             <a
//               href={`tel:${phone}`}
//               className="hover:text-[#173DB8]"
//             >
//               {phone}
//             </a>
//           </DetailRow>
//         )}

//         {/* EMAILS */}

//         {emails.length > 0 && (
//           <DetailRow
//             icon={
//               <EnvelopeIcon className="h-4 w-4" />
//             }
//           >
//             <div className="space-y-1">
//               {emails.map(
//                 (email, index) => (
//                   <a
//                     key={`${email}-${index}`}
//                     href={`mailto:${email}`}
//                     className="
//                       block
//                       break-all
//                       hover:text-[#173DB8]
//                     "
//                   >
//                     {email}
//                   </a>
//                 )
//               )}
//             </div>
//           </DetailRow>
//         )}

//         {/* WEBSITE */}

//         {website && (
//           <DetailRow
//             icon={
//               <GlobeAltIcon className="h-4 w-4" />
//             }
//           >
//             <a
//               href={
//                 website.startsWith(
//                   "http"
//                 )
//                   ? website
//                   : `https://${website}`
//               }
//               target="_blank"
//               rel="noopener noreferrer"
//               className="
//                 break-all
//                 text-[#173DB8]
//                 hover:underline
//               "
//             >
//               {website}
//             </a>
//           </DetailRow>
//         )}
//       </div>

//       {/* ==================================================
//           FOOTER
//       ================================================== */}

//       <div
//         className="
//           flex
//           items-center
//           justify-between
//           border-t
//           border-[#E8ECF5]
//           bg-[#FAFBFE]
//           px-5
//           py-3
//         "
//       >
//         <span
//           className={`
//             inline-flex
//             items-center
//             gap-1.5
//             rounded-full
//             px-2.5
//             py-1
//             text-xs
//             font-semibold
//             ${
//               status === "Active"
//                 ? "bg-green-50 text-green-700"
//                 : "bg-gray-100 text-gray-600"
//             }
//           `}
//         >
//           <span
//             className="
//               h-1.5
//               w-1.5
//               rounded-full
//               bg-current
//             "
//           />

//           {status || "Active"}
//         </span>
//       </div>
//     </article>
//   );
// }

// // ======================================================
// // DETAIL ROW
// // ======================================================

// function DetailRow({
//   icon,
//   children,
// }) {
//   return (
//     <div
//       className="
//         flex
//         items-start
//         gap-3
//         text-sm
//         leading-5
//         text-[#4B515C]
//       "
//     >
//       <span
//         className="
//           mt-0.5
//           flex
//           h-7
//           w-7
//           shrink-0
//           items-center
//           justify-center
//           rounded-lg
//           bg-[#EAF0FF]
//           text-[#173DB8]
//         "
//       >
//         {icon}
//       </span>

//       <div className="min-w-0 flex-1">
//         {children}
//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";

import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  PencilIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

// ======================================================
// COUNTRY FLAG HELPERS
// ======================================================

function countryCodeToEmoji(code = "") {
  const value = String(code).trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(value)) {
    return "";
  }

  return String.fromCodePoint(
    ...value
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
  );
}

function getCountryFlag(country = "") {
  const value = String(country).trim().toLowerCase();

  // ----------------------------------------------------
  // EUROPE
  // ----------------------------------------------------

  if (value.includes("ireland")) {
    return "🇮🇪";
  }

  if (value.includes("germany")) {
    return "🇩🇪";
  }

  if (
    value.includes("united kingdom") ||
    value === "uk" ||
    value.includes("england")
  ) {
    return "🇬🇧";
  }

  if (value.includes("czech")) {
    return "🇨🇿";
  }

  if (value.includes("spain")) {
    return "🇪🇸";
  }

  if (value.includes("romania")) {
    return "🇷🇴";
  }

  if (value.includes("finland")) {
    return "🇫🇮";
  }

  if (value.includes("france")) {
    return "🇫🇷";
  }

  if (value.includes("italy")) {
    return "🇮🇹";
  }

  if (value.includes("netherlands")) {
    return "🇳🇱";
  }

  if (value.includes("belgium")) {
    return "🇧🇪";
  }

  if (value.includes("poland")) {
    return "🇵🇱";
  }

  if (value.includes("sweden")) {
    return "🇸🇪";
  }

  if (value.includes("norway")) {
    return "🇳🇴";
  }

  if (value.includes("denmark")) {
    return "🇩🇰";
  }

  // ----------------------------------------------------
  // ASIA
  // ----------------------------------------------------

  if (value.includes("india")) {
    return "🇮🇳";
  }

  if (value.includes("malaysia")) {
    return "🇲🇾";
  }

  if (value.includes("singapore")) {
    return "🇸🇬";
  }

  if (value.includes("china")) {
    return "🇨🇳";
  }

  if (value.includes("japan")) {
    return "🇯🇵";
  }

  if (
    value.includes("south korea") ||
    value === "korea" ||
    value.includes("korea")
  ) {
    return "🇰🇷";
  }

  if (value.includes("indonesia")) {
    return "🇮🇩";
  }

  if (value.includes("thailand")) {
    return "🇹🇭";
  }

  if (value.includes("vietnam")) {
    return "🇻🇳";
  }

  // ----------------------------------------------------
  // AFRICA
  // ----------------------------------------------------

  if (value.includes("south africa")) {
    return "🇿🇦";
  }

  if (value.includes("nigeria")) {
    return "🇳🇬";
  }

  if (value.includes("kenya")) {
    return "🇰🇪";
  }

  if (value.includes("egypt")) {
    return "🇪🇬";
  }

  // ----------------------------------------------------
  // NORTH AMERICA
  // ----------------------------------------------------

  if (
    value.includes("united states") ||
    value === "usa" ||
    value.includes("america")
  ) {
    return "🇺🇸";
  }

  if (value.includes("canada")) {
    return "🇨🇦";
  }

  if (value.includes("mexico")) {
    return "🇲🇽";
  }

  if (value.includes("costa rica")) {
    return "🇨🇷";
  }

  // ----------------------------------------------------
  // FALLBACK
  // ----------------------------------------------------

  return "🌍";
}

// ======================================================
// NORMALIZE FLAG
// ======================================================

function normalizeFlag(flag, country = "") {
  const value = String(flag || "").trim();

  // No flag from API/database
  if (!value) {
    return getCountryFlag(country);
  }

  // Already an emoji
  if (/\p{Extended_Pictographic}/u.test(value)) {
    return value;
  }

  // ISO country code
  if (/^[A-Za-z]{2}$/.test(value)) {
    return (
      countryCodeToEmoji(value) ||
      getCountryFlag(country)
    );
  }

  // Country name stored in flag field
  return getCountryFlag(value);
}

// ======================================================
// WEBSITE URL
// ======================================================

function getWebsiteUrl(website = "") {
  if (!website) {
    return "";
  }

  const value = String(website).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `https://${value}`;
}

// ======================================================
// COMPONENT
// ======================================================

export default function DistributorCard({
  distributor,
  onEdit,
  onDelete,
}) {
  if (!distributor) {
    return null;
  }

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
    status,
  } = distributor;

  // ====================================================
  // DISPLAY VALUES
  // ====================================================

  const displayFlag = normalizeFlag(flag, country);

  const displayCountry =
    country || "Country not specified";

  const displayRegion =
    region || "Global";

  const displayLocation =
    location || "Location not available";

  const displayCompany =
    companyName || "Distributor name unavailable";

  const hasPhone = Boolean(phone);

  const hasEmails =
    Array.isArray(emails) &&
    emails.length > 0;

  const hasWebsite = Boolean(website);

  const websiteUrl =
    getWebsiteUrl(website);

  const phoneHref = phone
    ? `tel:${String(phone).replace(
        /[^\d+]/g,
        ""
      )}`
    : "";

  const currentStatus =
    status || "Active";

  const isActive =
    String(currentStatus).toLowerCase() ===
    "active";

  return (
    <article
      className="
        group
        relative
        flex
        h-full
        min-h-[430px]
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
          shrink-0
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
            COUNTRY / REGION / ACTIONS
        ================================================= */}

        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {/* COUNTRY */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
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
              title={displayCountry}
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
                  truncate
                  text-sm
                  font-medium
                  text-[#606673]
                "
                title={displayCountry}
              >
                {displayCountry}
              </p>
            </div>
          </div>

          {/* =================================================
              ADMIN ACTIONS
          ================================================= */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
            "
          >
            {/* EDIT */}

            <button
              type="button"
              onClick={() =>
                onEdit?.(distributor)
              }
              title="Edit distributor"
              aria-label="Edit distributor"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-[#173DB8]
                transition
                hover:bg-[#EAF0FF]
              "
            >
              <PencilIcon
                className="
                  h-4
                  w-4
                "
              />
            </button>

            {/* DELETE */}

            <button
              type="button"
              onClick={() =>
                onDelete?.(distributor)
              }
              title="Delete distributor"
              aria-label="Delete distributor"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-red-500
                transition
                hover:bg-red-50
              "
            >
              <TrashIcon
                className="
                  h-4
                  w-4
                "
              />
            </button>
          </div>
        </div>

        {/* =================================================
            COMPANY
        ================================================= */}

        <h2
          className="
            mt-5
            break-words
            text-xl
            font-bold
            leading-7
            text-[#151515]
          "
        >
          {displayCompany}
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

            <p
              className={`
                mt-1
                text-sm
                leading-6
                ${
                  location
                    ? "text-[#606673]"
                    : "italic text-[#9AA1AE]"
                }
              `}
            >
              {displayLocation}
            </p>
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
                <span className="break-all">
                  {website}
                </span>

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

      {/* ==================================================
          ADMIN STATUS FOOTER
      ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-[#E8ECF5]
          bg-[#FAFBFE]
          px-6
          py-3
        "
      >
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            px-2.5
            py-1
            text-xs
            font-semibold
            ${
              isActive
                ? "bg-green-50 text-green-700"
                : "bg-gray-100 text-gray-600"
            }
          `}
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-current
            "
          />

          {currentStatus}
        </span>
      </div>
    </article>
  );
}