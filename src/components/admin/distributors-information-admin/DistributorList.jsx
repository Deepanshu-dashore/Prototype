"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  MagnifyingGlassIcon,
  PlusIcon,
  FunnelIcon,
  ArrowPathIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import DistributorCard from "./DistributorCard";
import DistributorForm from "./DistributorForm";

// ======================================================
// REGIONS
// ======================================================

const REGIONS = [
  "All Regions",
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Other",
];

// ======================================================
// COMPONENT
// ======================================================

export default function DistributorList() {
  const [
    distributors,
    setDistributors,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [
    selectedRegion,
    setSelectedRegion,
  ] = useState("All Regions");

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState("All Status");

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    editingDistributor,
    setEditingDistributor,
  ] = useState(null);

  // ====================================================
  // FETCH
  // ====================================================

  const fetchDistributors =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            "/api/distributors",
            {
              cache: "no-store",
            }
          );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to load distributors"
          );
        }

        const data =
          Array.isArray(
            result?.data
          )
            ? result.data
            : [];

        setDistributors(data);
      } catch (fetchError) {
        console.error(
          fetchError
        );

        setError(
          fetchError?.message ||
            "Failed to load distributors"
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchDistributors();
  }, [fetchDistributors]);

  // ====================================================
  // FILTER
  // ====================================================

  const filteredDistributors =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return distributors.filter(
        (item) => {
          const searchableText = [
            item.companyName,
            item.country,
            item.region,
            item.city,
            item.state,
            item.location,
            item.phone,
            item.website,
            ...(Array.isArray(
              item.emails
            )
              ? item.emails
              : []),
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
            item.region ===
              selectedRegion;

          const matchesStatus =
            selectedStatus ===
              "All Status" ||
            item.status ===
              selectedStatus;

          return (
            matchesSearch &&
            matchesRegion &&
            matchesStatus
          );
        }
      );
    }, [
      distributors,
      search,
      selectedRegion,
      selectedStatus,
    ]);

  // ====================================================
  // ADD
  // ====================================================

  function handleAdd() {
    setEditingDistributor(null);
    setFormOpen(true);
  }

  // ====================================================
  // EDIT
  // ====================================================

  function handleEdit(
    distributor
  ) {
    setEditingDistributor(
      distributor
    );

    setFormOpen(true);
  }

  // ====================================================
  // DELETE
  // ====================================================

  async function handleDelete(
    distributor
  ) {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${distributor.companyName}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const id =
        distributor._id ||
        distributor.id;

      const response =
        await fetch(
          `/api/distributors/${id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to delete distributor"
        );
      }

      setDistributors(
        (previous) =>
          previous.filter(
            (item) =>
              (item._id ||
                item.id) !== id
          )
      );
    } catch (deleteError) {
      console.error(
        deleteError
      );

      window.alert(
        deleteError?.message ||
          "Failed to delete distributor"
      );
    }
  }

  // ====================================================
  // SUCCESS
  // ====================================================

  function handleFormSuccess(
    distributor
  ) {
    if (!distributor) {
      fetchDistributors();
      return;
    }

    const id =
      distributor._id ||
      distributor.id;

    setDistributors(
      (previous) => {
        const exists =
          previous.some(
            (item) =>
              (item._id ||
                item.id) === id
          );

        if (exists) {
          return previous.map(
            (item) =>
              (item._id ||
                item.id) === id
                ? distributor
                : item
          );
        }

        return [
          distributor,
          ...previous,
        ];
      }
    );
  }

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <div
            key={index}
            className="
              h-[350px]
              animate-pulse
              rounded-2xl
              bg-[#E9EDF6]
            "
          />
        ))}
      </div>
    );
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <>
      {/* ==================================================
          HEADER
      ================================================== */}

      <div
        className="
          mb-6
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#EAF0FF]
                text-[#173DB8]
              "
            >
              <UsersIcon className="h-6 w-6" />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-[#151515]
                "
              >
                Distributors
              </h1>

              <p
                className="
                  text-sm
                  text-[#737987]
                "
              >
                Manage global distributor
                information
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#173DB8]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-[#102A8A]
          "
        >
          <PlusIcon className="h-5 w-5" />

          Add Distributor
        </button>
      </div>

      {/* ==================================================
          ERROR
      ================================================== */}

      {error && (
        <div
          className="
            mb-6
            flex
            flex-col
            gap-3
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-sm
              text-red-700
            "
          >
            {error}
          </p>

          <button
            type="button"
            onClick={
              fetchDistributors
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              bg-white
              px-3
              py-2
              text-sm
              font-semibold
              text-red-700
              shadow-sm
            "
          >
            <ArrowPathIcon className="h-4 w-4" />

            Retry
          </button>
        </div>
      )}

      {/* ==================================================
          FILTER BAR
      ================================================== */}

      <div
        className="
          mb-6
          rounded-2xl
          border
          border-[#DDE3F2]
          bg-white
          p-4
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            xl:flex-row
          "
        >
          {/* SEARCH */}

          <div className="relative flex-1">
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
              placeholder="Search distributors..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-[#D8DFEF]
                pl-11
                pr-4
                text-sm
                outline-none
                focus:border-[#173DB8]
                focus:ring-4
                focus:ring-[#173DB8]/10
              "
            />
          </div>

          {/* REGION */}

          <div className="relative xl:w-52">
            <FunnelIcon
              className="
                absolute
                left-3.5
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-[#173DB8]
                pointer-events-none
              "
            />

            <select
              value={
                selectedRegion
              }
              onChange={(event) =>
                setSelectedRegion(
                  event.target.value
                )
              }
              className="
                h-11
                w-full
                appearance-none
                rounded-xl
                border
                border-[#D8DFEF]
                bg-white
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-[#173DB8]
              "
            >
              {REGIONS.map(
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
          </div>

          {/* STATUS */}

          <select
            value={
              selectedStatus
            }
            onChange={(event) =>
              setSelectedStatus(
                event.target.value
              )
            }
            className="
              h-11
              rounded-xl
              border
              border-[#D8DFEF]
              bg-white
              px-4
              text-sm
              outline-none
              focus:border-[#173DB8]
              xl:w-44
            "
          >
            <option>
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {/* REFRESH */}

          <button
            type="button"
            onClick={
              fetchDistributors
            }
            className="
              flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D8DFEF]
              px-4
              text-sm
              font-semibold
              text-[#30343B]
              hover:bg-[#F5F6FA]
            "
          >
            <ArrowPathIcon className="h-4 w-4" />

            Refresh
          </button>
        </div>

        {/* RESULT */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            text-xs
            text-[#737987]
          "
        >
          <span>
            Showing{" "}
            <strong className="text-[#173DB8]">
              {
                filteredDistributors.length
              }
            </strong>{" "}
            of{" "}
            <strong>
              {distributors.length}
            </strong>
          </span>

          {(search ||
            selectedRegion !==
              "All Regions" ||
            selectedStatus !==
              "All Status") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedRegion(
                  "All Regions"
                );
                setSelectedStatus(
                  "All Status"
                );
              }}
              className="
                font-semibold
                text-[#173DB8]
                hover:underline
              "
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ==================================================
          EMPTY
      ================================================== */}

      {filteredDistributors.length ===
        0 && (
        <div
          className="
            rounded-2xl
            border
            border-[#DDE3F2]
            bg-white
            px-6
            py-16
            text-center
          "
        >
          <UsersIcon
            className="
              mx-auto
              h-12
              w-12
              text-[#B8C3DD]
            "
          />

          <h2
            className="
              mt-4
              text-lg
              font-bold
              text-[#151515]
            "
          >
            No distributors found
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#737987]
            "
          >
            Add a distributor or
            change your filters.
          </p>

          <button
            type="button"
            onClick={handleAdd}
            className="
              mt-5
              rounded-xl
              bg-[#173DB8]
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
            "
          >
            Add Distributor
          </button>
        </div>
      )}

      {/* ==================================================
          GRID
      ================================================== */}

      {filteredDistributors.length >
        0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredDistributors.map(
            (distributor) => (
              <DistributorCard
                key={
                  distributor._id ||
                  distributor.id
                }
                distributor={
                  distributor
                }
                onEdit={
                  handleEdit
                }
                onDelete={
                  handleDelete
                }
              />
            )
          )}
        </div>
      )}

      {/* ==================================================
          FORM
      ================================================== */}

      <DistributorForm
        open={formOpen}
        distributor={
          editingDistributor
        }
        onClose={() => {
          setFormOpen(false);
          setEditingDistributor(
            null
          );
        }}
        onSuccess={
          handleFormSuccess
        }
      />
    </>
  );
}