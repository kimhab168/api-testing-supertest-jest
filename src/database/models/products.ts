import mongoose, { Schema } from "mongoose";
export interface ProductType {
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductSchema = new Schema<ProductType>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  {
    versionKey: false, // This will remove the __v field from mongoDB as Default
  }
);

export const ProductModel = mongoose.model<ProductType>(
  "Products",
  ProductSchema
);
export default ProductModel;
