import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pinCode: { type: String },
  _id: false,
});

const distributorSchema = new Schema(
  {
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyNumber: { type: String, required: true },
    yearOfEstablishment: { type: String },
    password: { type: String, required: true },
    contactPersonName: { type: String, required: true },
    contactPersonEmail: { type: String, required: true },
    contactPersonDesignation: { type: String, required: true },
    contactPersonNumber: { type: String, required: true },
    contactPersonAlterNumber: { type: String, required: true },
    shippingAddress: { type: addressSchema },
    registeredAddress: { type: addressSchema, required: true },
    billingAddress: { type: addressSchema },
    verification: {
      isVerified: { type: Boolean, default: false },
      verifiedDate: { type: Date },
    },
    history: [
      {
        date: { type: Date },
        note: { type: String },
      },
    ],
  },
  { timestamps: true },
);

const Distributor =
  models.Distributor || model("Distributor", distributorSchema);

export default Distributor;
