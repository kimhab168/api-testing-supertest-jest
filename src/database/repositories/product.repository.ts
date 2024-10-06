// src/repositories/product.repository.ts
import ProductModel, { ProductType } from "@/database/models/products";
import { ProductCreateRequest } from "@/controllers/types/product-request.type";
import { PaginationType } from "./types/paginationType";
import { NotFoundError } from "@/utils/errors";

interface QueryType {
  filter?: { [key: string]: string | number | { [key: string]: string } };
  sort?: { [key: string]: string };
  page?: number | 1;
  limit?: number | 1;
}

class ProductRepository {
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<ProductType> {
    try {
      const newProduct = await ProductModel.create(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
  async getAllProduct(qry: QueryType): Promise<PaginationType> {
    try {
      const page = qry.page || 1;
      const limit = qry.limit || 5;
      const sort = qry.sort || {};
      const filter = qry.filter || {};
      const skip = (page - 1) * limit;
      const newFilter: {
        [key: string]: string | number | { [key: string]: string | number };
      } = {};
      for (let i in filter) {
        if (typeof filter[i] === "object") {
          newFilter[i] = {};
          for (let j in filter[i]) {
            if (j === "min") {
              newFilter[i]["$gte"] = filter[i][j];
            } else if (j === "max") {
              newFilter[i]["$lte"] = filter[i][j];
            }
          }
        } else {
          newFilter[i] = filter[i];
        }
      }
      //sort
      const newSort: { [key: string]: 1 | -1 } = {};
      for (let i in sort) {
        newSort[i] = sort[i] === "asc" ? 1 : -1;
      }
      const data = await ProductModel.find(newFilter)
        .sort(newSort)
        .limit(limit)
        .skip(skip)
        .exec();
      const totalItem = await ProductModel.countDocuments(newFilter);
      const totalPage = Math.ceil(totalItem / limit);
      // data
      return {
        data: data,
        totalItem: totalItem,
        totalPage: totalPage,
        currentPage: page,
        limit: limit,
        skip: skip,
      };
    } catch (error) {
      throw error;
    }
  }
  public async getById(id: string): Promise<ProductType> {
    try {
      const data = await ProductModel.findById(id);
      if (!data) {
        throw new NotFoundError("No Item Found");
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async updateById(id: string, reqBody: ProductType) {
    try {
      const update = await ProductModel.findByIdAndUpdate(id, reqBody, {
        new: true,
      });
      if (!update) {
        throw new NotFoundError("No Item Found");
      }
      return update;
    } catch (error) {
      throw error;
    }
  }
  public async deleteById(id: string) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);
      if (!deleted) {
        throw new NotFoundError("No Item Found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

// Add more repository methods as needed
export default new ProductRepository();
