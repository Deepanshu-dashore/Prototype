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
            <span>
              {flag || "🌍"}
            </span>

            {country}
          </div>

          <h3
            className="
              break-words
              text-lg
              font-bold
              leading-6
              text-[#151515]
            "
          >
            {companyName}
          </h3>

          {region && (
            <p
              className="
                mt-1
                text-xs
                text-[#737987]
              "
            >
              {region}
            </p>
          )}
        </div>

        {/* ACTIONS */}

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={() =>
              onEdit?.(distributor)
            }
            title="Edit"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-[#173DB8]
              hover:bg-[#EAF0FF]
            "
          >
            <PencilIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() =>
              onDelete?.(distributor)
            }
            title="Delete"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-red-500
              hover:bg-red-50
            "
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ==================================================
          DETAILS
      ================================================== */}

      <div className="space-y-4 p-5">
        {/* LOCATION */}

        <DetailRow
          icon={
            <MapPinIcon className="h-4 w-4" />
          }
        >
          {location ||
            "Location not available"}
        </DetailRow>

        {/* PHONE */}

        {phone && (
          <DetailRow
            icon={
              <PhoneIcon className="h-4 w-4" />
            }
          >
            <a
              href={`tel:${phone}`}
              className="hover:text-[#173DB8]"
            >
              {phone}
            </a>
          </DetailRow>
        )}

        {/* EMAILS */}

        {emails.length > 0 && (
          <DetailRow
            icon={
              <EnvelopeIcon className="h-4 w-4" />
            }
          >
            <div className="space-y-1">
              {emails.map(
                (email, index) => (
                  <a
                    key={`${email}-${index}`}
                    href={`mailto:${email}`}
                    className="
                      block
                      break-all
                      hover:text-[#173DB8]
                    "
                  >
                    {email}
                  </a>
                )
              )}
            </div>
          </DetailRow>
        )}

        {/* WEBSITE */}

        {website && (
          <DetailRow
            icon={
              <GlobeAltIcon className="h-4 w-4" />
            }
          >
            <a
              href={
                website.startsWith(
                  "http"
                )
                  ? website
                  : `https://${website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                break-all
                text-[#173DB8]
                hover:underline
              "
            >
              {website}
            </a>
          </DetailRow>
        )}
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

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}