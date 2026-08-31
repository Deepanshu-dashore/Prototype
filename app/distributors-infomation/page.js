
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

function getCountryFlag(country = "") {
  const value = String(country)
    .trim()
    .toLowerCase();

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
    value.includes("uk") ||
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
    value.includes("usa") ||
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

function normalizeFlag(
  flag,
  country = ""
) {
  const value = String(flag || "").trim();

  // No flag from API → detect from country
  if (!value) {
    return getCountryFlag(country);
  }

  // API already provides an emoji
  if (
    /\p{Extended_Pictographic}/u.test(
      value
    )
  ) {
    return value;
  }

  // API provides ISO country code like ES, CZ, ZA, IN
  if (/^[A-Za-z]{2}$/.test(value)) {
    return (
      countryCodeToEmoji(value) ||
      getCountryFlag(country)
    );
  }

  // API may provide a country name in flag field
  return getCountryFlag(value);
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

const flag = normalizeFlag(
  item.flag,
  country
);

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

  const displayFlag =
  normalizeFlag(flag, country);
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