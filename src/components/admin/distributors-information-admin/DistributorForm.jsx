"use client";

import React, { useEffect, useState } from "react";

import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// ======================================================
// CONSTANTS
// ======================================================

const REGIONS = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Other",
];

const INITIAL_FORM = {
  companyName: "",
  country: "",
  region: "Europe",
  city: "",
  state: "",
  postalCode: "",
  location: "",
  emails: [""],
  phone: "",
  website: "",
  flag: "🌍",
  status: "Active",
  sortOrder: 0,
};

// ======================================================
// COMPONENT
// ======================================================

export default function DistributorForm({
  open,
  distributor,
  onClose,
  onSuccess,
}) {
  const [form, setForm] =
    useState(INITIAL_FORM);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const isEdit = Boolean(
    distributor?._id ||
      distributor?.id
  );

  // ====================================================
  // LOAD DATA
  // ====================================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setError("");

    if (distributor) {
      setForm({
        companyName:
          distributor.companyName ||
          "",

        country:
          distributor.country ||
          "",

        region:
          distributor.region ||
          "Europe",

        city:
          distributor.city ||
          "",

        state:
          distributor.state ||
          "",

        postalCode:
          distributor.postalCode ||
          "",

        location:
          distributor.location ||
          "",

        emails:
          Array.isArray(
            distributor.emails
          ) &&
          distributor.emails.length
            ? distributor.emails
            : [""],

        phone:
          distributor.phone ||
          "",

        website:
          distributor.website ||
          "",

        flag:
          distributor.flag ||
          "🌍",

        status:
          distributor.status ||
          "Active",

        sortOrder:
          distributor.sortOrder ?? 0,
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [open, distributor]);

  // ====================================================
  // INPUT
  // ====================================================

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ====================================================
  // EMAIL
  // ====================================================

  function handleEmailChange(
    index,
    value
  ) {
    setForm((previous) => {
      const emails = [
        ...previous.emails,
      ];

      emails[index] = value;

      return {
        ...previous,
        emails,
      };
    });
  }

  function addEmail() {
    setForm((previous) => ({
      ...previous,
      emails: [
        ...previous.emails,
        "",
      ],
    }));
  }

  function removeEmail(index) {
    setForm((previous) => {
      const emails =
        previous.emails.filter(
          (_, emailIndex) =>
            emailIndex !== index
        );

      return {
        ...previous,
        emails:
          emails.length > 0
            ? emails
            : [""],
      };
    });
  }

  // ====================================================
  // SUBMIT
  // ====================================================

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      const payload = {
        ...form,

        companyName:
          form.companyName.trim(),

        country:
          form.country.trim(),

        city:
          form.city.trim(),

        state:
          form.state.trim(),

        postalCode:
          form.postalCode.trim(),

        location:
          form.location.trim(),

        emails:
          form.emails
            .map((email) =>
              email.trim()
            )
            .filter(Boolean),

        phone:
          form.phone.trim(),

        website:
          form.website.trim(),

        flag:
          form.flag.trim() ||
          "🌍",

        sortOrder:
          Number(form.sortOrder) || 0,
      };

      if (!payload.companyName) {
        throw new Error(
          "Company name is required"
        );
      }

      if (!payload.country) {
        throw new Error(
          "Country is required"
        );
      }

      if (!payload.region) {
        throw new Error(
          "Region is required"
        );
      }

      const id =
        distributor?._id ||
        distributor?.id;

      const endpoint = isEdit
        ? `/api/distributors/${id}`
        : "/api/distributors";

      const method = isEdit
        ? "PUT"
        : "POST";

      const response =
        await fetch(endpoint, {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            payload
          ),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Something went wrong"
        );
      }

      onSuccess?.(result.data);

      onClose?.();
    } catch (submitError) {
      setError(
        submitError?.message ||
          "Failed to save distributor"
      );
    } finally {
      setSaving(false);
    }
  }

  // ====================================================
  // CLOSED
  // ====================================================

  if (!open) {
    return null;
  }

  // ====================================================
  // UI
  // ====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-4xl
          flex-col
          overflow-hidden
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E5E9F2]
            px-6
            py-5
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-[#151515]
              "
            >
              {isEdit
                ? "Edit Distributor"
                : "Add Distributor"}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#737987]
              "
            >
              Manage distributor
              information displayed on
              the website.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-[#737987]
              transition
              hover:bg-[#F1F4FC]
              hover:text-[#173DB8]
            "
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            flex-1
            overflow-y-auto
          "
        >
          <div className="space-y-7 p-6">
            {/* ERROR */}

            {error && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            {/* ==================================================
                COMPANY
            ================================================== */}

            <FormSection title="Company Information">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  label="Company Name"
                  name="companyName"
                  value={
                    form.companyName
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter company name"
                />

                <Input
                  label="Country"
                  name="country"
                  value={
                    form.country
                  }
                  onChange={
                    handleChange
                  }
                  required
                  placeholder="Enter country"
                />

                <Select
                  label="Region"
                  name="region"
                  value={
                    form.region
                  }
                  onChange={
                    handleChange
                  }
                  options={REGIONS}
                  required
                />

                <Input
                  label="Flag / Emoji"
                  name="flag"
                  value={
                    form.flag
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="🇮🇳"
                />
              </div>
            </FormSection>

            {/* ==================================================
                LOCATION
            ================================================== */}

            <FormSection title="Location">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  label="City"
                  name="city"
                  value={
                    form.city
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter city"
                />

                <Input
                  label="State / Province"
                  name="state"
                  value={
                    form.state
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter state / province"
                />

                <Input
                  label="Postal Code"
                  name="postalCode"
                  value={
                    form.postalCode
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter postal code"
                />

                <Input
                  label="Display Location"
                  name="location"
                  value={
                    form.location
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: Nagpur, Maharashtra, India - 440013"
                />
              </div>
            </FormSection>

            {/* ==================================================
                CONTACT
            ================================================== */}

            <FormSection title="Contact Information">
              {/* EMAILS */}

              <div>
                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >
                  <label
                    className="
                      text-sm
                      font-semibold
                      text-[#30343B]
                    "
                  >
                    Email Addresses
                  </label>

                  <button
                    type="button"
                    onClick={
                      addEmail
                    }
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-[#173DB8]
                      hover:bg-[#EAF0FF]
                    "
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Email
                  </button>
                </div>

                <div className="space-y-3">
                  {form.emails.map(
                    (
                      email,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="
                          flex
                          gap-2
                        "
                      >
                        <input
                          type="email"
                          value={
                            email
                          }
                          onChange={(
                            event
                          ) =>
                            handleEmailChange(
                              index,
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="email@example.com"
                          className="
                            h-11
                            flex-1
                            rounded-xl
                            border
                            border-[#D8DFEF]
                            px-4
                            text-sm
                            outline-none
                            focus:border-[#173DB8]
                            focus:ring-4
                            focus:ring-[#173DB8]/10
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeEmail(
                              index
                            )
                          }
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-red-500
                            hover:bg-red-50
                          "
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  label="Phone"
                  name="phone"
                  value={
                    form.phone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="+91 0000000000"
                />

                <Input
                  label="Website"
                  name="website"
                  value={
                    form.website
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="www.example.com"
                />
              </div>
            </FormSection>

            {/* ==================================================
                STATUS
            ================================================== */}

            <FormSection title="Display Settings">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Select
                  label="Status"
                  name="status"
                  value={
                    form.status
                  }
                  onChange={
                    handleChange
                  }
                  options={[
                    "Active",
                    "Inactive",
                  ]}
                />

                <Input
                  label="Sort Order"
                  name="sortOrder"
                  type="number"
                  value={
                    form.sortOrder
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="0"
                />
              </div>
            </FormSection>
          </div>

          {/* ==================================================
              FOOTER
          ================================================== */}

          <div
            className="
              sticky
              bottom-0
              flex
              justify-end
              gap-3
              border-t
              border-[#E5E9F2]
              bg-white
              px-6
              py-4
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                rounded-xl
                border
                border-[#D8DFEF]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-[#30343B]
                hover:bg-[#F5F6FA]
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                rounded-xl
                bg-[#173DB8]
                px-6
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#102A8A]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {saving
                ? "Saving..."
                : isEdit
                ? "Update Distributor"
                : "Add Distributor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ======================================================
// FORM SECTION
// ======================================================

function FormSection({
  title,
  children,
}) {
  return (
    <section>
      <h3
        className="
          mb-4
          text-sm
          font-bold
          uppercase
          tracking-wide
          text-[#173DB8]
        "
      >
        {title}
      </h3>

      <div>{children}</div>
    </section>
  );
}

// ======================================================
// INPUT
// ======================================================

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}) {
  return (
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
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-[#D8DFEF]
          bg-white
          px-4
          text-sm
          text-[#151515]
          outline-none
          transition
          placeholder:text-[#A0A5B0]
          focus:border-[#173DB8]
          focus:ring-4
          focus:ring-[#173DB8]/10
        "
      />
    </div>
  );
}

// ======================================================
// SELECT
// ======================================================

function Select({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
  return (
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
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          h-11
          w-full
          rounded-xl
          border
          border-[#D8DFEF]
          bg-white
          px-4
          text-sm
          text-[#151515]
          outline-none
          focus:border-[#173DB8]
          focus:ring-4
          focus:ring-[#173DB8]/10
        "
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}