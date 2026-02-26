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
      },
    ],
    po: { type: String },
    invoice: { type: String },
    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSED",
        "SHIPPEMENT",
        "DELIVERED",
        "RECEIVED",
        "CANCELLED",
      ],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

orderSchema.index({ orderBy: 1 });

const Order = models.Order || model("Order", orderSchema);
export default Order;
