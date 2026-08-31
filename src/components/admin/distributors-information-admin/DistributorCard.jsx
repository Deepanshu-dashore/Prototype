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
} from "@heroicons/react/24/outline";

// ======================================================
// COUNTRY CODE → FLAG EMOJI
// ======================================================

function countryCodeToEmoji(code = "") {
  const value = String(code)
    .trim()
    .toUpperCase();

  if (!/^[A-Z]{2}$/.test(value)) {
    return "";
  }

  return String.fromCodePoint(
    ...value
      .split("")
      .map(
        (char) =>
          127397 + char.charCodeAt(0)
      )
  );
}

// ======================================================
// COUNTRY NAME → FLAG
// ======================================================

function getCountryFlag(country = "") {
  const value = String(country)
    .trim()
    .toLowerCase();

  // ====================================================
  // EUROPE
  // ====================================================

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

  if (value.includes("switzerland")) {
    return "🇨🇭";
  }

  if (value.includes("austria")) {
    return "🇦🇹";
  }

  if (value.includes("portugal")) {
    return "🇵🇹";
  }

  // ====================================================
  // ASIA
  // ====================================================

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

  if (value.includes("philippines")) {
    return "🇵🇭";
  }

  if (value.includes("taiwan")) {
    return "🇹🇼";
  }

  // ====================================================
  // AFRICA
  // ====================================================

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

  if (value.includes("morocco")) {
    return "🇲🇦";
  }

  // ====================================================
  // NORTH AMERICA
  // ====================================================

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

  // ====================================================
  // SOUTH AMERICA
  // ====================================================

  if (value.includes("brazil")) {
    return "🇧🇷";
  }

  if (value.includes("argentina")) {
    return "🇦🇷";
  }

  if (value.includes("chile")) {
    return "🇨🇱";
  }

  if (value.includes("colombia")) {
    return "🇨🇴";
  }

  // ====================================================
  // OCEANIA
  // ====================================================

  if (value.includes("australia")) {
    return "🇦🇺";
  }

  if (value.includes("new zealand")) {
    return "🇳🇿";
  }

  // ====================================================
  // DEFAULT
  // ====================================================

  return "🌍";
}

// ======================================================
// NORMALIZE FLAG
// ======================================================

function normalizeFlag(flag, country = "") {
  const value = String(flag || "").trim();

  // ----------------------------------------------------
  // No flag → detect from country
  // ----------------------------------------------------

  if (!value) {
    return getCountryFlag(country);
  }

  // ----------------------------------------------------
  // Already an emoji
  // ----------------------------------------------------

  if (
    /\p{Extended_Pictographic}/u.test(value)
  ) {
    return value;
  }

  // ----------------------------------------------------
  // ISO code
  // Example: ES → 🇪🇸
  // ----------------------------------------------------

  if (/^[A-Za-z]{2}$/.test(value)) {
    return (
      countryCodeToEmoji(value) ||
      getCountryFlag(country)
    );
  }

  // ----------------------------------------------------
  // Country name stored inside flag field
  // ----------------------------------------------------

  return getCountryFlag(value);
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
// COMPONENT
// ======================================================

export default function DistributorCard({
  distributor,
  onEdit,
  onDelete,
}) {
  const {
    companyName,
    country,
    region,
    location,
    emails = [],
    phone,
    website,
    flag,
    status,
  } = distributor;

  // ====================================================
  // DISPLAY VALUES
  // ====================================================

  const displayFlag = normalizeFlag(
    flag,
    country
  );

  const displayCountry =
    country || "Country not specified";

  const displayRegion =
    region || "Region not specified";

  const displayCompany =
    companyName ||
    "Distributor name not specified";

  const displayLocation =
    location || "Location not provided";

  const hasPhone = Boolean(
    phone &&
      String(phone).trim()
  );

  const hasEmails =
    Array.isArray(emails) &&
    emails.length > 0;

  const hasWebsite = Boolean(
    website &&
      String(website).trim()
  );

  const websiteUrl =
    getWebsiteUrl(website);

  const phoneHref = hasPhone
    ? `tel:${String(phone).replace(
        /[^\d+]/g,
        ""
      )}`
    : "";

  // ====================================================
  // RETURN
  // ====================================================

  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#DDE3F2]
        bg-white
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      {/* ==================================================
          TOP
      ================================================== */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
          border-b
          border-[#E8ECF5]
          p-5
        "
      >
        <div className="min-w-0">

          {/* COUNTRY */}

          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#EAF0FF]
              px-3
              py-1
              text-xs
              font-semibold
              text-[#173DB8]
            "
          >
            <span
              className="
                text-base
                leading-none
              "
              aria-hidden="true"
            >
              {displayFlag}
            </span>

            <span>
              {displayCountry}
            </span>
          </div>

          {/* COMPANY */}

          <h3
            className="
              break-words
              text-lg
              font-bold
              leading-6
              text-[#151515]
            "
          >
            {displayCompany}
          </h3>

          {/* REGION */}

          <p
            className="
              mt-1
              text-xs
              font-medium
              text-[#737987]
            "
          >
            {displayRegion}
          </p>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div
          className="
            flex
            shrink-0
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

      {/* ==================================================
          DETAILS
      ================================================== */}

      <div
        className="
          space-y-4
          p-5
        "
      >

        {/* =================================================
            LOCATION
        ================================================= */}

        <DetailRow
          icon={
            <MapPinIcon
              className="
                h-4
                w-4
              "
            />
          }
        >
          {location ? (
            <span>
              {location}
            </span>
          ) : (
            <MissingValue>
              Location not provided
            </MissingValue>
          )}
        </DetailRow>

        {/* =================================================
            PHONE
        ================================================= */}

        <DetailRow
          icon={
            <PhoneIcon
              className="
                h-4
                w-4
              "
            />
          }
        >
          {hasPhone ? (
            <a
              href={phoneHref}
              className="
                break-words
                transition
                hover:text-[#173DB8]
              "
            >
              {phone}
            </a>
          ) : (
            <MissingValue>
              Phone number not provided
            </MissingValue>
          )}
        </DetailRow>

        {/* =================================================
            EMAILS
        ================================================= */}

        <DetailRow
          icon={
            <EnvelopeIcon
              className="
                h-4
                w-4
              "
            />
          }
        >
          {hasEmails ? (
            <div
              className="
                space-y-1
              "
            >
              {emails.map(
                (
                  email,
                  index
                ) => (
                  <a
                    key={`${email}-${index}`}
                    href={`mailto:${email}`}
                    className="
                      block
                      break-all
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
            <MissingValue>
              Email address not provided
            </MissingValue>
          )}
        </DetailRow>

        {/* =================================================
            WEBSITE
        ================================================= */}

        <DetailRow
          icon={
            <GlobeAltIcon
              className="
                h-4
                w-4
              "
            />
          }
        >
          {hasWebsite ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                break-all
                text-[#173DB8]
                transition
                hover:underline
              "
            >
              {website}
            </a>
          ) : (
            <MissingValue>
              Website not provided
            </MissingValue>
          )}
        </DetailRow>
      </div>

      {/* ==================================================
          FOOTER
      ================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-[#E8ECF5]
          bg-[#FAFBFE]
          px-5
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
              status === "Active"
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

          {status || "Active"}
        </span>
      </div>
    </article>
  );
}

// ======================================================
// DETAIL ROW
// ======================================================

function DetailRow({
  icon,
  children,
}) {
  return (
    <div
      className="
        flex
        items-start
        gap-3
        text-sm
        leading-5
        text-[#4B515C]
      "
    >
      <span
        className="
          mt-0.5
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-[#EAF0FF]
          text-[#173DB8]
        "
      >
        {icon}
      </span>

      <div
        className="
          min-w-0
          flex-1
        "
      >
        {children}
      </div>
    </div>
  );
}

// ======================================================
// MISSING VALUE
// ======================================================

function MissingValue({
  children,
}) {
  return (
    <span
      className="
        italic
        text-[#9AA1AE]
      "
    >
      {children}
    </span>
  );
}