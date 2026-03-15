import { Schema, model, models } from "mongoose";

const enquirySchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    productOfInterest: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Enquiry = models.Enquiry || model("Enquiry", enquirySchema);
