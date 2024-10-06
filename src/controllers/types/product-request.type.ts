export interface ProductCreateRequest {
  name: string;
  price: number;
  category: string;
  stock: number;
}

// Add this
export interface ProductUpdateRequest {
  name?: string;
  price?: number;
  category?: string;
  stock?: number;
}
