import { ProductType } from "@/database/models/products";
export interface PaginationType {
  data: ProductType[];
  totalItem: number;
  totalPage: number;
  currentPage: number;
  limit: number;
  skip: number;
}
