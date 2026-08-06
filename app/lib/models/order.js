import { Schema, model, models } from "mongoose";

const qcInspectionSchema = new Schema(
  {
    distributorCode: { type: String },
    distributorAccountName: { type: String },
    products: {
      type: [
        {
          materialCode: { type: String },
          length: { type: Number },
          thicknessWithinSpec: { type: Boolean },
          materialFreeFromSurfaceDefects: { type: Boolean },
          cleanAndFitForPurpose: { type: Boolean },
          micrometerImage: { type: String },
          materialImage: { type: String },
        },
      ],
    },
    shippingInfo: {
      type: [
        {
          palletDimensions: { type: String },
          palletWeight: { type: Number },
        },
      ],
    },
    orderReadyForShipment: { type: Boolean, default: false },
    processedBy: { type: String },
    processDate: { type: Date, default: Date.now },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    orderBy: {
      type: Schema.Types.ObjectId,
      ref: "Distributor",
      required: true,
    },
    qc: { type: qcInspectionSchema },
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
          resource_type: String,
          name: String,
        },
      ],
    },
    po: { type: String },
    invoice: { type: String },
    instructions: { type: String },
    status: {
      type: String,
      enum: ["PENDING", "IN PROCESS", "RECEIVED", "READY-TO-SHIP", "SHIPPED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

orderSchema.index({ orderBy: 1 });

const Order = models.Order || model("Order", orderSchema);
export default Order;
