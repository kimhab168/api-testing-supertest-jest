// tests/api/product.api.test.ts
import { connectToDB } from "../../src/database/connection";
import request from "supertest";
import app from "../../src/app"; // Import your Express app
import mongoose from "mongoose";

jest.setTimeout(20000);

// Test suite for Product API endpoints
describe("Product API Endpoints", () => {
  let createdProductId: string;

  // before each test, delete the created product (cleanup)
  beforeAll(async () => {
    await connectToDB();
  });

  //after
  afterAll(async () => {
    if (createdProductId) {
      await request(app).delete(`/v1/products/${createdProductId}`);
    }
    await mongoose.disconnect();
  });

  // Test case for creating a new product
  describe("GET /v1/products/{productId}", () => {
    beforeAll(async () => {
      const newProduct = {
        name: "Test Product",
        price: 100,
        category: "Electronics",
        stock: 50,
      };
      const response = await request(app).post("/v1/products").send(newProduct);
      expect(response.status).toBe(200);
      createdProductId = response.body.data._id;
    }, 20000);

    it("should return a new product", async () => {
      const response = await request(app)
        .get(`/v1/products/${createdProductId}`)
        .expect("Content-Type", /html/)
        .expect(200);

      expect(response.body).toHaveProperty("name", "Test Product");
      expect(response.body).toHaveProperty("price", 100);
      expect(response.body).toHaveProperty("category", "Electronics");
      expect(response.body).toHaveProperty("stock", 50);
    }, 20000);

    it("should return 404 no product found/exist", async () => {
      const nonExistProductId = "66849e01b47f6b60c073b480";

      await request(app)
        .get(`/v1/products/${nonExistProductId}`)
        .expect("Content-Type", /html/)
        .expect(404);
    }, 20000);
  });
});
