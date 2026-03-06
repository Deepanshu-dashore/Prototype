import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "Distributor",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        length: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],
    poLink: { type: String },
    invoiceLink: { type: String },
    po: { type: String },
    invoice: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSED", "RECEIVED", "READY-TO-SHIP", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

orderSchema.index({ orderBy: 1 });

const Order = models.Order || model("Order", orderSchema);
export default Order;
