"use client";

import React from "react";

// ======================================================
// COUNTRY CODE
// ======================================================

export function getCountryCode(country = "") {
  const value = String(country)
    .trim()
    .toLowerCase();

  // ====================================================
  // EUROPE
  // ====================================================

  if (value.includes("ireland")) return "IE";

  if (
    value.includes("united kingdom") ||
    value === "uk" ||
    value === "great britain") {
    return "GB";
  }

  if (value.includes("germany")) return "DE";
  if (value.includes("czech")) return "CZ";
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
    value === "us" ||
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

  // ====================================================
  // OCEANIA
  // ====================================================

  if (value.includes("australia")) return "AU";
  if (value.includes("new zealand")) return "NZ";

  return "";
}

// ======================================================
// MANUAL FLAG MAP
// ======================================================

const COUNTRY_FLAGS = {
  IN: "🇮🇳",
  DE: "🇩🇪",
  GB: "🇬🇧",
  IE: "🇮🇪",
  CZ: "🇨🇿",
  ES: "🇪🇸",
  RO: "🇷🇴",
  FI: "🇫🇮",
  FR: "🇫🇷",
  IT: "🇮🇹",
  NL: "🇳🇱",
  BE: "🇧🇪",
  PL: "🇵🇱",
  SE: "🇸🇪",
  NO: "🇳🇴",
  DK: "🇩🇰",
  CH: "🇨🇭",
  AT: "🇦🇹",
  PT: "🇵🇹",
  GR: "🇬🇷",

  MY: "🇲🇾",
  SG: "🇸🇬",
  CN: "🇨🇳",
  JP: "🇯🇵",
  KR: "🇰🇷",
  ID: "🇮🇩",
  TH: "🇹🇭",
  VN: "🇻🇳",
  PH: "🇵🇭",
  TW: "🇹🇼",

  ZA: "🇿🇦",
  NG: "🇳🇬",
  KE: "🇰🇪",
  EG: "🇪🇬",
  MA: "🇲🇦",

  US: "🇺🇸",
  CA: "🇨🇦",
  MX: "🇲🇽",
  CR: "🇨🇷",
  PA: "🇵🇦",

  BR: "🇧🇷",
  AR: "🇦🇷",
  CL: "🇨🇱",
  CO: "🇨🇴",
  PE: "🇵🇪",

  AU: "🇦🇺",
  NZ: "🇳🇿",
};

// ======================================================
// GET MANUAL FLAG
// ======================================================

export function getCountryFlag(country = "") {
  const code = getCountryCode(country);

  return COUNTRY_FLAGS[code] || "🌍";
}

// ======================================================
// COUNTRY FLAG COMPONENT
// ======================================================

export default function CountryFlag({
  country = "",
  className = "",
  title,
}) {
  const flag = getCountryFlag(country);

  return (
    <span
      className={`
        inline-flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-[#F3F6FF]
        text-2xl
        leading-none
        ${className}
      `}
      title={title || country || "Country"}
      aria-label={`${country || "Unknown"} flag`}
    >
      {flag}
    </span>
  );
}