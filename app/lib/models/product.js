import { Schema, models, model } from "mongoose";

const productSchema = new Schema(
  {
    code: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

productSchema.index({ code: 1 });

const Product = models.Product || model("Product", productSchema);
export default Product;
