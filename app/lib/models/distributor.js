import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pinCode: { type: String },
  additionalInfo: { type: String }, // Added as per request
  additionalDetails: { type: String }, // Keeping existing field just in case
  _id: false,
});

const distributorSchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyNumber: { type: String, required: true },
    password: { type: String },
    linkedin: { type: String },
    website: { type: String },
    contactPersonName: { type: String, required: true },
    contactPersonEmail: { type: String, required: true },
    contactPersonDesignation: { type: String, required: true },
    contactPersonNumber: { type: String, required: true },
    shippingAddress: { type: addressSchema },
    registeredAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema },
    verification: {
      isVerified: { type: Boolean, default: false },
      verifiedDate: { type: Date },
    },
    question1: { type: Boolean, default: false },
    question2: { type: String },
    history: [
      {
        date: { type: Date },
        note: { type: String },
      },
    ],
    documents: [
      {
        url: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const Distributor =
  models.Distributor || model("Distributor", distributorSchema);

export default Distributor;
