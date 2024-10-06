// src/services/product.service.ts
import { ProductCreateRequest } from "@/controllers/types/product-request.type";
import { ProductType } from "@/database/models/products";
import ProductRepository from "@/database/repositories/product.repository";
// import { PaginationType } from "@/database/repositories/types/paginationType";

interface QueryType {
  filter?: string;
  sort?: string;
  limit?: number | 0;
  page?: number | 0;
}

export class ProductService {
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<ProductType> {
    try {
      const newProduct = await ProductRepository.createProduct(productRequest);
      return newProduct;
    } catch (error) {
      console.log(`ProductService - createProduct() method error: ${error}`);
      throw error;
    }
  }
  public async getAllData(qry: QueryType) {
    try {
      const { page, limit, filter, sort } = qry;
      const newQuery = {
        page,
        limit,
        filter: filter && JSON.parse(filter),
        sort: sort && JSON.parse(sort),
      };
      const data = await ProductRepository.getAllProduct(newQuery);
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async getById(id: string) {
    try {
      const data = await ProductRepository.getById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  public async updateById(id: string, reqBody: ProductType) {
    try {
      const update = await ProductRepository.updateById(id, reqBody);
      return update;
    } catch (error) {
      throw error;
    }
  }
  public async deleteById(id: string) {
    try {
      const deleted = await ProductRepository.deleteById(id);
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService();
