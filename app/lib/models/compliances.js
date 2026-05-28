import { model, models, Schema } from "mongoose";

const complianceSchema = new Schema(
  {
    title: { type: String, required: true },
    url: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    catgory: {
      type: String,
      default: "Official Standards",
    },
    status: {
      type: String,
      enum: [
        "Current",
        "Report",
        "Regulatory",
        "Performance",
        "Safety",
        "Product",
      ],
      required: true,
    },
  },
  { timestamps: true },
);

export const Compliance =
  models.Compliance || model("Compliance", complianceSchema);

export { Compliance };
export default Compliance;
