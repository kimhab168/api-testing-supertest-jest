// src/controllers/product.controller.ts
import {
  Controller,
  Route,
  Body,
  Post,
  Response,
  Get,
  Middlewares,
  Queries,
  Path,
  Put,
  Delete,
} from "tsoa";
import { ProductCreateRequest } from "@/controllers/types/product-request.type";
import { ProductResponse } from "@/controllers/types/user-response.type";
import ProductService from "@/services/product.service";
import validateRequest from "@/middlewares/validate-input";
import productCreateSchema from "@/schema/product-create-schema";
import { PaginationType } from "@/database/repositories/types/paginationType";
import { ProductType } from "@/database/models/products";

interface QueryType {
  filter?: string;
  sort?: string;
  limit?: number | 0;
  page?: number | 0;
}
@Route("v1/products")
export class ProductController extends Controller {
  @Post()
  // @Response(201, "Created Success")
  @Middlewares(validateRequest(productCreateSchema))
  public async createItem(
    @Body() reqBody: ProductCreateRequest
  ): Promise<ProductResponse> {
    try {
      const newProduct = await ProductService.createProduct(reqBody);
      return {
        message: "success",
        data: {
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          stock: newProduct.stock,
        },
      };
    } catch (error) {
      throw error;
    }
  }
  @Get()
  @Response(200, "Here data")
  public async getAllData(
    @Queries()
    qry: QueryType
  ): Promise<PaginationType> {
    try {
      const allData = await ProductService.getAllData(qry);
      return {
        data: allData.data,
        totalItem: allData.totalItem,
        totalPage: allData.totalPage,
        currentPage: allData.currentPage,
        limit: allData.limit,
        skip: allData.skip,
      };
    } catch (error) {
      throw error;
    }
  }
  @Get("{id}")
  @Response(200, "Success")
  public async getById(@Path() id: string) {
    try {
      const data = await ProductService.getById(id);

      return data;
    } catch (error) {
      throw error;
    }
  }
  @Put("{id}")
  @Middlewares(validateRequest(productCreateSchema))
  public async function(
    @Path() id: string,
    @Body() reqBody: ProductType
  ): Promise<ProductType> {
    try {
      const dataUpdate = await ProductService.updateById(id, reqBody);
      return dataUpdate;
    } catch (error) {
      throw error;
    }
  }
  @Delete("{id}")
  @Response(204, "No Content")
  public async deleteById(@Path() id: string) {
    try {
      await ProductService.deleteById(id);
    } catch (error) {
      throw error;
    }
  }
}
