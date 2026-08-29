import mongoose from "mongoose";

// ======================================================
// DISTRIBUTOR SCHEMA
// ======================================================

const distributorSchema = new mongoose.Schema(
  {
    // ==================================================
    // COMPANY
    // ==================================================

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: [
        2,
        "Company name must contain at least 2 characters",
      ],
      maxlength: [
        200,
        "Company name cannot exceed 200 characters",
      ],
    },

    // ==================================================
    // LOCATION
    // ==================================================

    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [
        100,
        "Country cannot exceed 100 characters",
      ],
    },

    region: {
      type: String,
      required: [true, "Region is required"],
      enum: {
        values: [
          "Europe",
          "Asia",
          "Africa",
          "North America",
          "South America",
          "Oceania",
          "Other",
        ],
        message: "Invalid distributor region",
      },
      index: true,
    },

    city: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "City cannot exceed 100 characters",
      ],
      default: "",
    },

    state: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "State / Province cannot exceed 100 characters",
      ],
      default: "",
    },

    postalCode: {
      type: String,
      trim: true,
      maxlength: [
        30,
        "Postal code cannot exceed 30 characters",
      ],
      default: "",
    },

    location: {
      type: String,
      trim: true,
      maxlength: [
        300,
        "Location cannot exceed 300 characters",
      ],
      default: "",
    },

    // ==================================================
    // CONTACT
    // ==================================================

    emails: {
      type: [
        {
          type: String,
          trim: true,
          lowercase: true,
          match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid email address",
          ],
        },
      ],
      default: [],
    },

    phone: {
      type: String,
      trim: true,
      maxlength: [
        50,
        "Phone number cannot exceed 50 characters",
      ],
      default: "",
    },

    website: {
      type: String,
      trim: true,
      maxlength: [
        300,
        "Website cannot exceed 300 characters",
      ],
      default: "",
    },

    // ==================================================
    // DISPLAY
    // ==================================================

    flag: {
      type: String,
      trim: true,
      maxlength: [10, "Invalid flag"],
      default: "🌍",
    },

    // ==================================================
    // STATUS
    // ==================================================

    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Invalid distributor status",
      },
      default: "Active",
      index: true,
    },

    // ==================================================
    // SORT ORDER
    // ==================================================

    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ======================================================
// INDEX
// ======================================================

distributorSchema.index({
  companyName: "text",
  country: "text",
  city: "text",
  state: "text",
  location: "text",
});

// ======================================================
// MODEL
// ======================================================

export const DistributorInformation =
  mongoose.models.DistributorInformation ||
  mongoose.model(
    "DistributorInformation",
    distributorSchema
  );

export const Distributor = DistributorInformation;

export default DistributorInformation;