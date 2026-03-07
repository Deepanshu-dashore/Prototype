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
        },
        length: {
          type: Number,
          required: true,
        },
      },
    ],
    documents: {
      type: [
        {
          url: String,
          id: String,
          name: String,
          resource_type: String,
        },
      ],
    },
    po: { type: String },
    invoice: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSED", "RECEIVED", "READY-TO-SHIP"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

orderSchema.index({ orderBy: 1 });

const Order = models.Order || model("Order", orderSchema);
export default Order;
