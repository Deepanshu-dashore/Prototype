import { model, models, Schema } from "mongoose";

const complianceSchema = new Schema(
  {
    title: { type: String, required: true },
    url: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
  { timestamps: true },
);

export const Compliance =
  models.Compliance || model("Compliance", complianceSchema);

export { Compliance };
export default Compliance;
