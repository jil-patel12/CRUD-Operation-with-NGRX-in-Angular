import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/views/product/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  createProduct(product: Product) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(productId: number | string, product: Partial<Product>) {
    return this.http.patch(`${this.apiUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: number | string) {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
}
