import productRepository from "../product.repository";
import ProductModel, { ProductType } from "@/database/models/products";
import { ProductCreateRequest } from "@/controllers/types/product-request.type";
import { NotFoundError } from "@/utils/errors";

jest.mock("@/database/models/products");

describe("Product Repository", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all previous mock calls
  });

  describe("createProduct", () => {
    it("should create and return a new product", async () => {
      const mockProduct: ProductCreateRequest = {
        name: "Test Product",
        price: 100,
        category: "Electronics",
        stock: 10,
      };
      const savedProduct: ProductType = mockProduct;
      (ProductModel.create as jest.Mock).mockResolvedValue(savedProduct); // Mock the create method

      const result = await productRepository.createProduct(mockProduct);

      expect(ProductModel.create).toHaveBeenCalledWith(mockProduct); // Check if create was called with the correct argument
      expect(result).toEqual(savedProduct); // Check if the returned value is as expected
    });
  });

  describe("getAllProduct", () => {
    it("should return paginated products based on query parameters", async () => {
      const mockProducts: ProductType[] = [
        {
          name: "Product 1",
          price: 10,
          category: "Category 1",
          stock: 5,
        },
        {
          name: "Product 2",
          price: 20,
          category: "Category 2",
          stock: 10,
        },
      ];

      // Create a mock for the Mongoose query chain
      const mockQuery = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockProducts),
      };

      // Mock ProductModel.find to return the mockQuery object
      (ProductModel.find as jest.Mock).mockReturnValue(mockQuery);
      (ProductModel.countDocuments as jest.Mock).mockResolvedValue(2);

      const result = await productRepository.getAllProduct({
        page: 1,
        limit: 2,
        sort: { price: "asc" },
      });

      // Expect find to be called with empty filter
      expect(ProductModel.find).toHaveBeenCalledWith({});

      // Verify that the chainable methods were called in the correct order
      expect(mockQuery.sort).toHaveBeenCalledWith({ price: 1 }); // Sort by ascending price
      expect(mockQuery.limit).toHaveBeenCalledWith(2); // Limit results to 2 items
      expect(mockQuery.skip).toHaveBeenCalledWith(0); // Skip 0 items (first page)

      // Check the result to match the mock pagination structure
      expect(result).toEqual({
        data: mockProducts,
        totalItem: 2,
        totalPage: 1,
        currentPage: 1,
        limit: 2,
        skip: 0,
      });
    });
  });

  describe("getById", () => {
    it("should return a product when given a valid ID", async () => {
      const mockProduct: ProductType = {
        name: "Test Product",
        price: 100,
        category: "Electronics",
        stock: 10,
      };
      (ProductModel.findById as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productRepository.getById("1");

      expect(ProductModel.findById).toHaveBeenCalledWith("1"); // Check if findById was called with the correct ID
      expect(result).toEqual(mockProduct); // Check if the returned value is as expected
    });

    it("should throw NotFoundError when product is not found", async () => {
      (ProductModel.findById as jest.Mock).mockResolvedValue(null);

      await expect(productRepository.getById("1")).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe("updateById", () => {
    it("should update and return the updated product", async () => {
      const mockProduct: ProductType = {
        name: "Updated Product",
        price: 150,
        category: "Electronics",
        stock: 15,
      };
      (ProductModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        mockProduct
      );

      const result = await productRepository.updateById("1", mockProduct);

      expect(ProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "1",
        mockProduct,
        { new: true }
      );
      expect(result).toEqual(mockProduct);
    });

    it("should throw NotFoundError when product is not found", async () => {
      (ProductModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await expect(
        productRepository.updateById("1", {
          name: "New Name",
          price: 11,
          stock: 22,
          category: "ggggg",
        })
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("deleteById", () => {
    it("should delete and return the deleted product", async () => {
      const mockProduct: ProductType = {
        name: "Test Product",
        price: 100,
        category: "Electronics",
        stock: 10,
      };
      (ProductModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockProduct
      );

      const result = await productRepository.deleteById("1");

      expect(ProductModel.findByIdAndDelete).toHaveBeenCalledWith("1");
      expect(result).toEqual(mockProduct);
    });

    it("should throw NotFoundError when product is not found", async () => {
      (ProductModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(productRepository.deleteById("1")).rejects.toThrow(
        NotFoundError
      );
    });
  });
});
