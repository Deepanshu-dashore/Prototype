"use client";

import React, { useState } from "react";

import {
  EnvelopeIcon,
  UserIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChevronRightIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import { useApiClient } from "@/src/config/axios";
import { toast } from "react-hot-toast";
import Footer from "@/src/components/share/Footer";

// ======================================================
// INITIAL FORM
// ======================================================

const initialForm = {
  email: "",

  salesProcessClarity: "",
  installationSafetyCompliance: "",

  productsMeetNeeds: "",
  productRangeQuality: "",
  responsiveness: "",
  trainingSatisfaction: "",
  overallSatisfaction: "",
  repurchaseLikelihood: "",

  recommendToColleague: "",

  comments: "",

  name: "",
  titleRole: "",
  companyOrganisation: "",
};

// ======================================================
// QUESTIONS
// ======================================================

const questions = [
  {
    key: "salesProcessClarity",
    number: 1,
    question:
      "Was the information provided during the sales process clear and informative?",
    type: "rating",
  },

  {
    key: "installationSafetyCompliance",
    number: 2,
    question:
      "Did the Installation team adhere to all site-specific regulations and safety standards?",
    type: "yesno",
  },

  {
    key: "productsMeetNeeds",
    number: 3,
    question: "How well do our products meet your needs?",
    type: "rating",
  },

  {
    key: "productRangeQuality",
    number: 4,
    question:
      "How would you rate the quality of our product range?",
    type: "rating",
  },

  {
    key: "responsiveness",
    number: 5,
    question:
      "How responsive have we been to your questions or concerns about our products?",
    type: "rating",
  },

  {
    key: "trainingSatisfaction",
    number: 6,
    question:
      "How happy were you with the training provided on how to clean and maintain our products?",
    type: "rating",
  },

  {
    key: "overallSatisfaction",
    number: 7,
    question:
      "Overall, how satisfied or dissatisfied are you with CC Matting?",
    type: "rating",
  },

  {
    key: "repurchaseLikelihood",
    number: 8,
    question:
      "How likely are you to purchase any of our products again?",
    type: "rating",
  },

  {
    key: "recommendToColleague",
    number: 9,
    question:
      "Would you recommend CC Matting & their products to a colleague?",
    type: "yesno",
  },
];

// ======================================================
// MAIN COMPONENT
// ======================================================

export default function CustomerFeedbackPage() {
  const api = useApiClient();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // ====================================================
  // API
  // ====================================================

  const feedbackMutation = api.usePost(
    "customer-feedback",
    "/customer-feedback",
    {
      onSuccess: () => {
        toast.success(
          "Thank you! Your feedback has been submitted."
        );

        setForm({
          ...initialForm,
        });

        setErrors({});

        setSubmitted(true);

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },

      onError: (error) => {
        console.error(
          "Customer feedback error:",
          error
        );

        const message =
          error?.response?.data?.message ||
          "Failed to submit feedback. Please try again.";

        toast.error(message);
      },
    }
  );

  // ====================================================
  // UPDATE FIELD
  // ====================================================

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  // ====================================================
  // VALIDATE FORM
  // ====================================================

  const validateForm = () => {
    const newErrors = {};

    // --------------------------------------------------
    // EMAIL
    // --------------------------------------------------

    if (!form.email.trim()) {
      newErrors.email =
        "Email address is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(
        form.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    // --------------------------------------------------
    // QUESTIONS
    // --------------------------------------------------

    questions.forEach((question) => {
      const value = form[question.key];

      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        newErrors[question.key] =
          "This field is required";

        return;
      }

      // Rating validation

      if (question.type === "rating") {
        const rating = Number(value);

        if (
          !Number.isInteger(rating) ||
          rating < 0 ||
          rating > 10
        ) {
          newErrors[question.key] =
            "Please select a rating between 0 and 10";
        }
      }

      // Yes / No validation

      if (question.type === "yesno") {
        if (!["Yes", "No"].includes(value)) {
          newErrors[question.key] =
            "Please select Yes or No";
        }
      }
    });

    // --------------------------------------------------
    // NAME
    // --------------------------------------------------

    if (!form.name.trim()) {
      newErrors.name =
        "Name is required";
    } else if (
      form.name.trim().length < 2
    ) {
      newErrors.name =
        "Name must contain at least 2 characters";
    } else if (
      form.name.trim().length > 100
    ) {
      newErrors.name =
        "Name cannot exceed 100 characters";
    }

    // --------------------------------------------------
    // TITLE / ROLE
    // --------------------------------------------------

    if (!form.titleRole.trim()) {
      newErrors.titleRole =
        "Title / Role is required";
    } else if (
      form.titleRole.trim().length > 100
    ) {
      newErrors.titleRole =
        "Title / Role cannot exceed 100 characters";
    }

    // --------------------------------------------------
    // COMPANY
    // --------------------------------------------------

    if (!form.companyOrganisation.trim()) {
      newErrors.companyOrganisation =
        "Company / Organisation is required";
    } else if (
      form.companyOrganisation.trim().length > 150
    ) {
      newErrors.companyOrganisation =
        "Company / Organisation cannot exceed 150 characters";
    }

    // --------------------------------------------------
    // COMMENTS
    // --------------------------------------------------

    if (form.comments.length > 1000) {
      newErrors.comments =
        "Comments cannot exceed 1,000 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const valid = validateForm();

    if (!valid) {
      toast.error(
        "Please complete all required fields."
      );

      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });

      return;
    }

    const payload = {
      email: form.email.trim(),

      salesProcessClarity:
        Number(form.salesProcessClarity),

      installationSafetyCompliance:
        form.installationSafetyCompliance,

      productsMeetNeeds:
        Number(form.productsMeetNeeds),

      productRangeQuality:
        Number(form.productRangeQuality),

      responsiveness:
        Number(form.responsiveness),

      trainingSatisfaction:
        Number(form.trainingSatisfaction),

      overallSatisfaction:
        Number(form.overallSatisfaction),

      repurchaseLikelihood:
        Number(form.repurchaseLikelihood),

      recommendToColleague:
        form.recommendToColleague,

      comments:
        form.comments.trim(),

      name:
        form.name.trim(),

      titleRole:
        form.titleRole.trim(),

      companyOrganisation:
        form.companyOrganisation.trim(),
    };

    feedbackMutation.mutate(payload);
  };

  // ====================================================
  // SUCCESS SCREEN
  // ====================================================

  if (submitted) {
    return (
      <main
        className="
          min-h-screen
          bg-[#F1F4FC]
          flex
          items-center
          justify-center
          px-4
          py-16
        "
      >
        <div
          className="
            w-full
            max-w-xl
            bg-white
            rounded-3xl
            shadow-xl
            border
            border-[#DDE3F2]
            p-8
            sm:p-12
            text-center
          "
        >
          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-[#EAF0FF]
              flex
              items-center
              justify-center
            "
          >
            <CheckCircleIcon
              className="
                h-12
                w-12
                text-[#173DB8]
              "
            />
          </div>

          <h1
            className="
              mt-7
              text-3xl
              sm:text-4xl
              font-bold
              text-[#151515]
            "
          >
            Thank You!
          </h1>

          <p
            className="
              mt-4
              text-[#606673]
              leading-7
            "
          >
            Your feedback has been
            successfully submitted.
            We really appreciate you
            taking the time to share
            your experience with
            CC Matting.
          </p>

          <button
            type="button"
            onClick={() => {
              setForm({
                ...initialForm,
              });

              setErrors({});

              setSubmitted(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="
              mt-8
              bg-[#173DB8]
              hover:bg-[#102A8A]
              text-white
              px-7
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            Submit Another Response
          </button>
        </div>
      </main>
    );
  }

  // ====================================================
  // MAIN FORM
  // ====================================================

  return (
    <>
    <main
      className="
        min-h-screen
        bg-[#F1F4FC]
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
  {/* =====================================================
      BACKGROUND
  ===================================================== */}

  <div
    className="
      absolute
      inset-0
      pointer-events-none
    "
  >
    {/* Grid */}
    <div
      className="
        absolute
        inset-0
        opacity-[0.055]
        bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
        bg-[size:60px_60px]
      "
    />

    {/* Top Right Glow */}
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
      "
    />

    {/* Bottom Left Glow */}
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
      "
    />

    {/* Decorative Dots */}

    <div
      className="
        absolute
        top-16
        right-[12%]
        h-2
        w-2
        rounded-full
        bg-white/40
      "
    />

    <div
      className="
        absolute
        top-32
        right-[25%]
        h-1.5
        w-1.5
        rounded-full
        bg-white/30
      "
    />

    <div
      className="
        absolute
        bottom-20
        left-[18%]
        h-2
        w-2
        rounded-full
        bg-white/30
      "
    />

    <div
      className="
        absolute
        bottom-32
        right-[38%]
        h-1.5
        w-1.5
        rounded-full
        bg-white/20
      "
    />
  </div>

  {/* =====================================================
      HERO CONTENT
  ===================================================== */}

  <div
    className="
      relative
      max-w-7xl
      mx-auto
      px-5
      sm:px-8
      py-10
      sm:py-14
      lg:py-16
    "
  >
    <div
      className="
        grid
        lg:grid-cols-[1.15fr_0.85fr]
        gap-8
        lg:gap-14
        items-center
      "
    >

      {/* =================================================
          LEFT CONTENT
      ================================================= */}

      <div
        className="
          max-w-3xl
        "
      >

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
            font-medium
            shadow-sm
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
            <ChatBubbleLeftRightIcon
              className="
                h-4
                w-4
              "
            />
          </span>

          Customer Experience
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
          We Value Your

          <span
            className="
              block
              text-[#AFC0FF]
            "
          >
            Feedback
          </span>
        </h1>

        {/* Description */}

        <p
          className="
            mt-5
            max-w-2xl
            text-base
            sm:text-lg
            leading-7
            sm:leading-8
            text-white/80
          "
        >
          Your experience helps us improve.
          Tell us about your experience with
          CC Matting, our products, installation
          and customer service.
        </p>

        {/* Benefits */}

        <div
          className="
            mt-6
            flex
            flex-wrap
            gap-x-7
            gap-y-3
            text-sm
            text-white/75
          "
        >
          {/* Benefit 1 */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#AFC0FF]
              "
            />

            Takes only a few minutes
          </div>

          {/* Benefit 2 */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#AFC0FF]
              "
            />

            Your feedback matters
          </div>

          {/* Benefit 3 */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#AFC0FF]
              "
            />

            Helps us improve
          </div>
        </div>
      </div>

      {/* =================================================
          RIGHT SIDE CARD
      ================================================= */}

      <div
        className="
          relative
          hidden
          lg:flex
          justify-center
          items-center
        "
      >

        {/* Card Glow */}

        <div
          className="
            absolute
            h-72
            w-72
            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        {/* Main Card */}

        <div
          className="
            relative
            w-full
            max-w-[350px]
            rounded-3xl
            border
            border-white/20
            bg-white/[0.10]
            backdrop-blur-xl
            p-6
            shadow-2xl
          "
        >

          {/* Icon */}

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-[#173DB8]
              shadow-lg
            "
          >
            <ChatBubbleLeftRightIcon
              className="
                h-7
                w-7
              "
            />
          </div>

          {/* Title */}

          <h2
            className="
              mt-6
              text-2xl
              font-semibold
              tracking-tight
            "
          >
            Your opinion matters
          </h2>

          {/* Description */}

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-white/70
            "
          >
            Share your experience with
            our team and help us continue
            delivering better contamination
            control solutions.
          </p>

          {/* Rating Box */}

          <div
            className="
              mt-6
              rounded-2xl
              bg-white/10
              border
              border-white/10
              p-4
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  text-white/70
                "
              >
                Customer satisfaction
              </span>

              <span
                className="
                  text-sm
                  font-semibold
                "
              >
                0 — 10
              </span>
            </div>

            {/* Rating Indicators */}

            <div
              className="
                mt-4
                flex
                gap-1.5
              "
            >
              {Array.from(
                { length: 10 }
              ).map((_, index) => (
                <div
                  key={index}
                  className="
                    h-2
                    flex-1
                    rounded-full
                    bg-white/20
                  "
                />
              ))}
            </div>

            <div
              className="
                mt-3
                flex
                justify-between
                text-xs
                text-white/50
              "
            >
              <span>
                Not satisfied
              </span>

              <span>
                Very satisfied
              </span>
            </div>
          </div>

          {/* Bottom Message */}

          <div
            className="
              mt-5
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                h-10
                w-10
                shrink-0
                rounded-full
                bg-[#AFC0FF]/20
                flex
                items-center
                justify-center
              "
            >
              <CheckCircleIcon
                className="
                  h-5
                  w-5
                  text-[#AFC0FF]
                "
              />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-medium
                "
              >
                Thank you for your feedback
              </p>

              <p
                className="
                  text-xs
                  text-white/50
                "
              >
                Helping us get better
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            FLOATING CARD
        ================================================= */}

        {/* <div
          className="
            absolute
            -bottom-3
            -left-4
            xl:-left-10
            rounded-2xl
            bg-white
            px-4
            py-3
            shadow-xl
            text-gray-900
            border
            border-white
          "
        > */}
          {/* <div
            className="
              flex
              items-center
              gap-3
            "
          > */}

            {/* Icon */}

            {/* <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-[#173DB8]/10
              "
            >
              <CheckCircleIcon
                className="
                  h-5
                  w-5
                  text-[#173DB8]
                "
              />
            </div> */}

            {/* Text */}

            {/* <div>
              <p
                className="
                  text-sm
                  font-semibold
                "
              >
                Your voice matters
              </p>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                Help us improve
              </p>
            </div> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  </div>

  {/* =====================================================
      BOTTOM TRANSITION
  ===================================================== */}

  <div
    className="
      absolute
      bottom-0
      left-0
      right-0
      h-8
      bg-gradient-to-t
      from-black/10
      to-transparent
      pointer-events-none
    "
  />
</section>

      {/* =================================================
          FORM CONTAINER
      ================================================= */}

      <div
        className="
          max-w-5xl
          mx-auto
          px-4
          sm:px-6
          py-10
          sm:py-14
        "
      >
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          {/* ============================================
              CUSTOMER DETAILS
          ============================================= */}

          <section
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-[#DDE3F2]
              p-5
              sm:p-8
            "
          >
            <div className="mb-8">
              <span
                className="
                  text-[#173DB8]
                  font-bold
                  text-sm
                  uppercase
                  tracking-wider
                "
              >
                Your Details
              </span>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-[#151515]
                "
              >
                Tell us about yourself
              </h2>

              <p
                className="
                  mt-2
                  text-[#737987]
                "
              >
                Please provide your
                contact information.
              </p>
            </div>

            <div
              className="
                grid
                md:grid-cols-2
                gap-5
              "
            >
              {/* EMAIL */}

              <InputField
                label="Email Address"
                icon={
                  <EnvelopeIcon className="h-5 w-5" />
                }
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
                error={errors.email}
              />

              {/* NAME */}

              <InputField
                label="Name"
                icon={
                  <UserIcon className="h-5 w-5" />
                }
                required
                placeholder="Your full name"
                maxLength={100}
                value={form.name}
                onChange={(event) =>
                  updateField(
                    "name",
                    event.target.value
                  )
                }
                error={errors.name}
              />

              {/* ROLE */}

              <InputField
                label="Title / Role"
                icon={
                  <BriefcaseIcon className="h-5 w-5" />
                }
                required
                placeholder="e.g. Facilities Manager"
                maxLength={100}
                value={form.titleRole}
                onChange={(event) =>
                  updateField(
                    "titleRole",
                    event.target.value
                  )
                }
                error={errors.titleRole}
              />

              {/* COMPANY */}

              <InputField
                label="Company / Organisation"
                icon={
                  <BuildingOffice2Icon className="h-5 w-5" />
                }
                required
                placeholder="Company name"
                maxLength={150}
                value={form.companyOrganisation}
                onChange={(event) =>
                  updateField(
                    "companyOrganisation",
                    event.target.value
                  )
                }
                error={
                  errors.companyOrganisation
                }
              />
            </div>
          </section>

          {/* ============================================
              FEEDBACK QUESTIONS
          ============================================= */}

          {questions.map((item) => (
            <section
              key={item.key}
              className="
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-[#DDE3F2]
                p-5
                sm:p-8
              "
            >
              <div className="flex gap-4">
                {/* NUMBER */}

                <div
                  className="
                    flex-shrink-0
                    w-10
                    h-10
                    rounded-xl
                    bg-[#EAF0FF]
                    text-[#173DB8]
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  {item.number}
                </div>

                {/* QUESTION */}

                <div
                  className="
                    flex-1
                    min-w-0
                  "
                >
                  <h3
                    className="
                      text-base
                      sm:text-lg
                      font-semibold
                      text-[#151515]
                      leading-7
                    "
                  >
                    {item.question}

                    <span
                      className="
                        text-red-500
                        ml-1
                      "
                    >
                      *
                    </span>
                  </h3>

                  {/* RATING */}

                  {item.type === "rating" ? (
                    <RatingSelector
                      value={form[item.key]}
                      onChange={(value) =>
                        updateField(
                          item.key,
                          value
                        )
                      }
                    />
                  ) : (
                    <YesNoSelector
                      value={form[item.key]}
                      onChange={(value) =>
                        updateField(
                          item.key,
                          value
                        )
                      }
                    />
                  )}

                  <FieldError
                    message={
                      errors[item.key]
                    }
                  />
                </div>
              </div>
            </section>
          ))}

          {/* ============================================
              COMMENTS
          ============================================= */}

          <section
            className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-[#DDE3F2]
              p-5
              sm:p-8
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >
              <label
                className="
                  font-semibold
                  text-[#151515]
                "
              >
                Do you have any other
                comments or feedback?
              </label>

              <span
                className="
                  text-xs
                  text-[#737987]
                  whitespace-nowrap
                "
              >
                Optional
              </span>
            </div>

            <textarea
              rows={6}
              maxLength={1000}
              value={form.comments}
              onChange={(event) =>
                updateField(
                  "comments",
                  event.target.value
                )
              }
              placeholder="Please share any additional feedback..."
              className={`
                mt-4
                w-full
                rounded-2xl
                border
                px-4
                py-4
                outline-none
                resize-none
                text-[#151515]
                placeholder:text-[#9CA1AC]
                transition

                ${
                  errors.comments
                    ? "border-red-400"
                    : "border-[#D8DFEF] focus:border-[#173DB8] focus:ring-4 focus:ring-[#173DB8]/10"
                }
              `}
            />

            <div
              className="
                mt-2
                flex
                justify-end
                text-xs
                text-[#737987]
              "
            >
              {form.comments.length}/1000
            </div>

            <FieldError
              message={errors.comments}
            />
          </section>

          {/* ============================================
              SUBMIT
          ============================================= */}

          <section
            className="
              bg-white
              rounded-3xl
              border
              border-[#DDE3F2]
              p-5
              sm:p-8
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-5
            "
          >
            <div>
              <h3
                className="
                  font-bold
                  text-[#151515]
                "
              >
                Ready to submit?
              </h3>

              <p
                className="
                  text-sm
                  text-[#737987]
                  mt-1
                "
              >
                Please check your
                answers before
                submitting.
              </p>
            </div>

            <button
              type="submit"
              disabled={
                feedbackMutation.isPending
              }
              className="
                w-full
                sm:w-auto
                min-w-[210px]
                bg-[#173DB8]
                hover:bg-[#102A8A]
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                px-7
                py-4
                rounded-xl
                font-bold
                flex
                items-center
                justify-center
                gap-2
                shadow-lg
                shadow-blue-900/20
                transition
              "
            >
              {feedbackMutation.isPending
                ? "Submitting..."
                : "Submit Feedback"}

              {!feedbackMutation.isPending && (
                <ChevronRightIcon
                  className="h-5 w-5"
                />
              )}
            </button>
          </section>
        </form>
      </div>
     
    </main>
     <Footer />
    </>
    
  );
}

// ======================================================
// INPUT FIELD
// ======================================================

function InputField({
  label,
  icon,
  required = false,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
  error,
}) {
  return (
    <div>
      <label
        className="
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-[#30343B]
        "
      >
        <span className="text-[#173DB8]">
          {icon}
        </span>

        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`
          mt-2
          w-full
          h-12
          rounded-xl
          border
          bg-white
          px-4
          text-[#151515]
          outline-none
          transition
          placeholder:text-[#9CA1AC]

          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-[#D8DFEF] focus:border-[#173DB8] focus:ring-4 focus:ring-[#173DB8]/10"
          }
        `}
      />

      <FieldError message={error} />
    </div>
  );
}

// ======================================================
// RATING SELECTOR
// ======================================================

function RatingSelector({
  value,
  onChange,
}) {
  return (
    <div className="mt-5">
      <div
        className="
          grid
          grid-cols-6
          sm:grid-cols-11
          gap-2
        "
      >
        {Array.from(
          { length: 11 },
          (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                onChange(index)
              }
              className={`
                h-11
                rounded-xl
                border
                font-semibold
                text-sm
                transition-all

                ${
                  Number(value) === index
                    ? "bg-[#173DB8] text-white border-[#173DB8] shadow-lg shadow-blue-900/20 scale-105"
                    : "bg-white text-[#30343B] border-[#D8DFEF] hover:border-[#173DB8] hover:text-[#173DB8]"
                }
              `}
            >
              {index}
            </button>
          )
        )}
      </div>

      <div
        className="
          flex
          justify-between
          gap-3
          mt-2
          text-xs
          text-[#737987]
        "
      >
        <span>
          0 — Not satisfied
        </span>

        <span>
          10 — Extremely satisfied
        </span>
      </div>
    </div>
  );
}

// ======================================================
// YES / NO SELECTOR
// ======================================================

function YesNoSelector({
  value,
  onChange,
}) {
  return (
    <div
      className="
        flex
        gap-3
        mt-5
      "
    >
      {["Yes", "No"].map(
        (option) => (
          <button
            key={option}
            type="button"
            onClick={() =>
              onChange(option)
            }
            className={`
              min-w-[90px]
              px-7
              py-3
              rounded-xl
              border
              font-semibold
              transition-all

              ${
                value === option
                  ? "bg-[#173DB8] border-[#173DB8] text-white shadow-md"
                  : "bg-white border-[#D8DFEF] text-[#30343B] hover:border-[#173DB8] hover:text-[#173DB8]"
              }
            `}
          >
            {option}
          </button>
        )
      )}
    </div>
  );
}

// ======================================================
// ERROR MESSAGE
// ======================================================

function FieldError({
  message,
}) {
  if (!message) {
    return null;
  }

  return (
    <p
      className="
        mt-2
        text-sm
        text-red-600
      "
    >
      {message}
    </p>
    
  );
}