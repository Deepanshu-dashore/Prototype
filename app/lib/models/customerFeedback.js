import mongoose from "mongoose";

// ======================================================
// CUSTOMER FEEDBACK SCHEMA
// ======================================================

const customerFeedbackSchema = new mongoose.Schema(
  {
    // ==================================================
    // CUSTOMER DETAILS
    // ==================================================

    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must contain at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    titleRole: {
      type: String,
      required: [true, "Title / Role is required"],
      trim: true,
      maxlength: [
        100,
        "Title / Role cannot exceed 100 characters",
      ],
    },

    companyOrganisation: {
      type: String,
      required: [
        true,
        "Company / Organisation is required",
      ],
      trim: true,
      maxlength: [
        150,
        "Company / Organisation cannot exceed 150 characters",
      ],
    },

    // ==================================================
    // FEEDBACK
    // ==================================================

    salesProcessClarity: {
      type: Number,
      required: [true, "Sales process clarity is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    installationSafetyCompliance: {
      type: String,
      required: [
        true,
        "Installation safety response is required",
      ],
      enum: {
        values: ["Yes", "No"],
        message:
          "Installation safety response must be Yes or No",
      },
    },

    productsMeetNeeds: {
      type: Number,
      required: [true, "Products meet needs rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    productRangeQuality: {
      type: Number,
      required: [true, "Product range quality rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    responsiveness: {
      type: Number,
      required: [true, "Responsiveness rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    trainingSatisfaction: {
      type: Number,
      required: [true, "Training satisfaction rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    overallSatisfaction: {
      type: Number,
      required: [true, "Overall satisfaction rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    repurchaseLikelihood: {
      type: Number,
      required: [true, "Repurchase likelihood rating is required"],
      min: [0, "Rating cannot be below 0"],
      max: [10, "Rating cannot be above 10"],
    },

    recommendToColleague: {
      type: String,
      required: [
        true,
        "Recommendation response is required",
      ],
      enum: {
        values: ["Yes", "No"],
        message:
          "Recommendation response must be Yes or No",
      },
    },

    comments: {
      type: String,
      trim: true,
      maxlength: [
        1000,
        "Comments cannot exceed 1,000 characters",
      ],
      default: "",
    },

    // ==================================================
    // ADMIN
    // ==================================================

    status: {
      type: String,
      enum: {
        values: ["New", "Read", "Responded"],
        message: "Invalid feedback status",
      },
      default: "New",
      index: true,
    },

    // Email is not being used currently.
    // Keeping this field for future email integration.
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// MODEL
// ======================================================

export const CustomerFeedback =
  mongoose.models.CustomerFeedback ||
  mongoose.model(
    "CustomerFeedback",
    customerFeedbackSchema
  );