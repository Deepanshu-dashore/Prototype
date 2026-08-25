"use client";

import React, { useState } from "react";

import {
  EnvelopeIcon,
  UserIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  XMarkIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

import { useApiClient } from "@/src/config/axios";
import { toast } from "react-hot-toast";

export default function CustomerFeedbackAdminPage() {
  const api = useApiClient();

  // =====================================================
  // STATE
  // =====================================================

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedFeedback, setSelectedFeedback] =
    useState(null);

  // =====================================================
  // GET FEEDBACK
  // =====================================================

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = api.useGet(
    ["customer-feedback", page, search, status],
    `/customer-feedback?page=${page}&limit=10&search=${encodeURIComponent(
      search
    )}&status=${encodeURIComponent(status)}`
  );

  // =====================================================
  // UPDATE STATUS
  // =====================================================

  const statusMutation = api.usePatch(
    "customer-feedback",
    "/customer-feedback",
    {
      onSuccess: () => {
        toast.success(
          "Feedback status updated successfully"
        );

        refetch();
      },

      onError: (error) => {
        console.error(
          "Status update error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to update feedback status"
        );
      },
    }
  );

  // =====================================================
  // DELETE FEEDBACK
  // =====================================================

  const deleteMutation = api.useDelete(
    "customer-feedback",
    "/customer-feedback",
    {
      onSuccess: () => {
        toast.success(
          "Feedback deleted successfully"
        );

        setSelectedFeedback(null);

        refetch();
      },

      onError: (error) => {
        console.error(
          "Delete feedback error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to delete feedback"
        );
      },
    }
  );

  // =====================================================
  // RESPONSE DATA
  // =====================================================

  const feedback = data?.data?.feedback || [];

  const pagination = data?.data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  // =====================================================
  // STATUS CHANGE
  // =====================================================

  const handleStatusChange = (
    feedbackId,
    newStatus
  ) => {
    statusMutation.mutate({
      id: feedbackId,
      status: newStatus,
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (feedbackId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer feedback?"
    );

    if (!confirmed) return;

    deleteMutation.mutate({
      url: `/customer-feedback?id=${feedbackId}`,
    });
  };

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((previous) => previous - 1);
    }
  };

  const handleNextPage = () => {
    if (page < (pagination.totalPages || 1)) {
      setPage((previous) => previous + 1);
    }
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  // =====================================================
  // STATUS FILTER
  // =====================================================

  const handleStatusFilter = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString(
        "en-IE",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "-";
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1F4FC] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse" />

          <div className="mt-6 h-24 bg-white rounded-2xl animate-pulse" />

          <div className="mt-6 h-96 bg-white rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#F1F4FC] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">
          <div>
            <div className="flex items-center gap-2 text-[#173DB8] text-xs font-bold uppercase tracking-wider">
              <ShieldCheckIcon className="w-4 h-4" />

              CC Matting
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-[#151515]">
              Customer Feedback
            </h1>

            <p className="mt-2 text-sm sm:text-base text-[#737987]">
              View and manage customer feedback submitted
              through the website.
            </p>
          </div>

          {/* TOTAL */}

          <div className="bg-white rounded-2xl border border-[#DDE3F2] px-6 py-4 min-w-[160px]">
            <p className="text-xs font-semibold text-[#737987] uppercase tracking-wide">
              Total Feedback
            </p>

            <p className="mt-1 text-3xl font-bold text-[#173DB8]">
              {pagination.total || 0}
            </p>
          </div>
        </div>

        {/* =================================================
            FILTER BAR
        ================================================= */}

        <div className="bg-white rounded-2xl border border-[#DDE3F2] p-4 mb-5">
          <div className="flex flex-col md:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B91A0]" />

              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by name, email or company..."
                className="
                  w-full
                  h-12
                  pl-11
                  pr-4
                  rounded-xl
                  border
                  border-[#D8DFEF]
                  text-sm
                  text-[#151515]
                  outline-none
                  transition
                  placeholder:text-[#9CA1AC]
                  focus:border-[#173DB8]
                  focus:ring-4
                  focus:ring-[#173DB8]/10
                "
              />
            </div>

            {/* STATUS */}

            <select
              value={status}
              onChange={handleStatusFilter}
              className="
                h-12
                md:w-48
                px-4
                rounded-xl
                border
                border-[#D8DFEF]
                bg-white
                text-sm
                text-[#30343B]
                outline-none
                focus:border-[#173DB8]
              "
            >
              <option value="">All Status</option>
              <option value="New">New</option>
              <option value="Read">Read</option>
              <option value="Responded">
                Responded
              </option>
            </select>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="bg-white rounded-2xl border border-[#DDE3F2] overflow-hidden">

          {isFetching && (
            <div className="h-1 bg-[#173DB8] animate-pulse" />
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">

              {/* TABLE HEAD */}

              <thead className="bg-[#F7F8FC]">
                <tr>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Company
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Overall
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Recommend
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-[#737987]">
                    Actions
                  </th>

                </tr>
              </thead>

              {/* TABLE BODY */}

              <tbody>
                {feedback.map((item) => (
                  <tr
                    key={item._id}
                    className="
                      border-t
                      border-[#EDF0F6]
                      hover:bg-[#FAFBFE]
                      transition
                    "
                  >

                    {/* CUSTOMER */}

                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#151515]">
                        {item.name}
                      </div>

                      <div className="flex items-center gap-1.5 mt-1 text-xs text-[#737987]">
                        <EnvelopeIcon className="w-4 h-4" />

                        {item.email}
                      </div>
                    </td>

                    {/* COMPANY */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#30343B]">
                        <BuildingOffice2Icon className="w-4 h-4 text-[#173DB8]" />

                        <span>
                          {item.companyOrganisation}
                        </span>
                      </div>
                    </td>

                    {/* OVERALL */}

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EAF0FF] text-[#173DB8] font-bold text-sm">
                        <StarIcon className="w-4 h-4 fill-current" />

                        {item.overallSatisfaction}/10
                      </span>
                    </td>

                    {/* RECOMMEND */}

                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex
                          px-3
                          py-1.5
                          rounded-lg
                          text-xs
                          font-bold

                          ${
                            item.recommendToColleague ===
                            "Yes"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }
                        `}
                      >
                        {item.recommendToColleague}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <select
                        value={item.status || "New"}
                        onChange={(event) =>
                          handleStatusChange(
                            item._id,
                            event.target.value
                          )
                        }
                        disabled={
                          statusMutation.isPending
                        }
                        className="
                          px-3
                          py-2
                          rounded-lg
                          border
                          border-[#D8DFEF]
                          bg-white
                          text-sm
                          text-[#30343B]
                          outline-none
                          focus:border-[#173DB8]
                          disabled:opacity-50
                        "
                      >
                        <option value="New">
                          New
                        </option>

                        <option value="Read">
                          Read
                        </option>

                        <option value="Responded">
                          Responded
                        </option>
                      </select>
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#737987]">
                        <CalendarDaysIcon className="w-4 h-4" />

                        {formatDate(item.createdAt)}
                      </div>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedFeedback(item)
                          }
                          title="View feedback"
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-[#EAF0FF]
                            text-[#173DB8]
                            flex
                            items-center
                            justify-center
                            hover:bg-[#173DB8]
                            hover:text-white
                            transition
                          "
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item._id)
                          }
                          disabled={
                            deleteMutation.isPending
                          }
                          title="Delete feedback"
                          className="
                            w-9
                            h-9
                            rounded-lg
                            bg-red-50
                            text-red-600
                            flex
                            items-center
                            justify-center
                            hover:bg-red-600
                            hover:text-white
                            transition
                            disabled:opacity-50
                          "
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

                {/* EMPTY */}

                {!feedback.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-20 text-center"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-[#EAF0FF] text-[#173DB8] flex items-center justify-center">
                        <ChatBubbleLeftRightIcon className="w-8 h-8" />
                      </div>

                      <h3 className="mt-4 font-bold text-[#151515]">
                        No feedback found
                      </h3>

                      <p className="mt-1 text-sm text-[#737987]">
                        Customer feedback submissions
                        will appear here.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div className="border-t border-[#EDF0F6] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <p className="text-sm text-[#737987]">
              Showing page{" "}
              <strong>
                {pagination.page || 1}
              </strong>{" "}
              of{" "}
              <strong>
                {pagination.totalPages || 1}
              </strong>
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={handlePreviousPage}
                className="
                  w-10
                  h-10
                  rounded-lg
                  border
                  border-[#D8DFEF]
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-[#30343B]
                  hover:border-[#173DB8]
                  hover:text-[#173DB8]
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <span className="
                min-w-[42px]
                h-10
                px-3
                rounded-lg
                bg-[#173DB8]
                text-white
                flex
                items-center
                justify-center
                text-sm
                font-bold
              ">
                {page}
              </span>

              <button
                type="button"
                disabled={
                  page >=
                    (pagination.totalPages || 1) ||
                  isFetching
                }
                onClick={handleNextPage}
                className="
                  w-10
                  h-10
                  rounded-lg
                  border
                  border-[#D8DFEF]
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-[#30343B]
                  hover:border-[#173DB8]
                  hover:text-[#173DB8]
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* ===================================================
          DETAIL MODAL
      =================================================== */}

      {selectedFeedback && (
        <FeedbackDetailModal
          feedback={selectedFeedback}
          onClose={() =>
            setSelectedFeedback(null)
          }
        />
      )}
    </div>
  );
}

// ======================================================
// DETAIL MODAL
// ======================================================

function FeedbackDetailModal({
  feedback,
  onClose,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-4xl
          max-h-[90vh]
          overflow-y-auto
          bg-white
          rounded-3xl
          shadow-2xl
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-[#173DB8]
            text-white
            px-6
            py-5
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Feedback Details
            </h2>

            <p className="mt-1 text-sm text-white/70">
              Complete customer response
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-white/10
              transition
            "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* BODY */}

        <div className="p-5 sm:p-7">

          {/* CUSTOMER INFORMATION */}

          <SectionTitle>
            Customer Information
          </SectionTitle>

          <div className="grid sm:grid-cols-2 gap-4">

            <DetailItem
              icon={
                <UserIcon className="w-4 h-4" />
              }
              label="Name"
              value={feedback.name}
            />

            <DetailItem
              icon={
                <EnvelopeIcon className="w-4 h-4" />
              }
              label="Email Address"
              value={feedback.email}
            />

            <DetailItem
              icon={
                <BriefcaseIcon className="w-4 h-4" />
              }
              label="Title / Role"
              value={feedback.titleRole}
            />

            <DetailItem
              icon={
                <BuildingOffice2Icon className="w-4 h-4" />
              }
              label="Company / Organisation"
              value={feedback.companyOrganisation}
            />

          </div>

          {/* FEEDBACK */}

          <SectionTitle>
            Feedback Responses
          </SectionTitle>

          <div className="grid sm:grid-cols-2 gap-4">

            <RatingDetail
              label="Sales Process Clarity"
              value={feedback.salesProcessClarity}
            />

            <DetailItem
              label="Installation Safety Standards"
              value={
                feedback.installationSafetyCompliance
              }
            />

            <RatingDetail
              label="Products Meet Needs"
              value={feedback.productsMeetNeeds}
            />

            <RatingDetail
              label="Product Range Quality"
              value={feedback.productRangeQuality}
            />

            <RatingDetail
              label="Responsiveness"
              value={feedback.responsiveness}
            />

            <RatingDetail
              label="Training Satisfaction"
              value={feedback.trainingSatisfaction}
            />

            <RatingDetail
              label="Overall Satisfaction"
              value={feedback.overallSatisfaction}
            />

            <RatingDetail
              label="Likelihood to Purchase Again"
              value={feedback.repurchaseLikelihood}
            />

            <DetailItem
              label="Recommend to Colleague"
              value={feedback.recommendToColleague}
            />

          </div>

          {/* COMMENTS */}

          <SectionTitle>
            Additional Comments
          </SectionTitle>

          <div
            className="
              rounded-2xl
              bg-[#F1F4FC]
              border
              border-[#DDE3F2]
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-[#173DB8]
                font-bold
              "
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />

              Customer Comments
            </div>

            <p
              className="
                mt-3
                text-[#505661]
                leading-7
                whitespace-pre-wrap
                break-words
              "
            >
              {feedback.comments ||
                "No additional comments provided."}
            </p>
          </div>

          {/* SUBMISSION DATE */}

          <div className="mt-5 flex items-center gap-2 text-sm text-[#737987]">
            <CalendarDaysIcon className="w-5 h-5" />

            Submitted on{" "}
            {feedback.createdAt
              ? new Date(
                  feedback.createdAt
                ).toLocaleString("en-IE")
              : "-"}
          </div>

        </div>
      </div>
    </div>
  );
}

// ======================================================
// SECTION TITLE
// ======================================================

function SectionTitle({ children }) {
  return (
    <h3
      className="
        mt-7
        mb-4
        text-lg
        font-bold
        text-[#173DB8]
        first:mt-0
      "
    >
      {children}
    </h3>
  );
}

// ======================================================
// DETAIL ITEM
// ======================================================

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div
      className="
        bg-[#F8F9FC]
        border
        border-[#EDF0F6]
        rounded-xl
        p-4
      "
    >
      <p
        className="
          flex
          items-center
          gap-2
          text-xs
          uppercase
          tracking-wide
          font-bold
          text-[#737987]
        "
      >
        {icon}

        {label}
      </p>

      <p
        className="
          mt-2
          font-semibold
          text-[#151515]
          break-words
        "
      >
        {value || "-"}
      </p>
    </div>
  );
}

// ======================================================
// RATING DETAIL
// ======================================================

function RatingDetail({
  label,
  value,
}) {
  return (
    <div
      className="
        bg-[#F8F9FC]
        border
        border-[#EDF0F6]
        rounded-xl
        p-4
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <p
        className="
          text-sm
          font-semibold
          text-[#30343B]
        "
      >
        {label}
      </p>

      <span
        className="
          flex
          items-center
          gap-1
          px-3
          py-1.5
          rounded-lg
          bg-[#EAF0FF]
          text-[#173DB8]
          font-bold
          whitespace-nowrap
        "
      >
        <StarIcon className="w-4 h-4 fill-current" />

        {value}/10
      </span>
    </div>
  );
}