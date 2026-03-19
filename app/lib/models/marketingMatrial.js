import { Schema, model, models } from "mongoose";

const marketingAssetSchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["youtube", "social_post", "case_study", "playbook"],
      required: true,
    },
    attachment: {
      type: String,
    },
    attachmentType: {
      type: String,
    },
    url: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const MarketingAsset =
  models.MarketingAsset || model("MarketingAsset", marketingAssetSchema);

export default MarketingAsset;
