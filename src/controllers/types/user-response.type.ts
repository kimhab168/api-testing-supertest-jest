import { ProductType } from "@/database/models/products";

export interface ProductResponse {
  message: string;
  data: ProductType;
}
