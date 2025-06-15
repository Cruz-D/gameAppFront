import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product/Iproduct.Interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:32770/api/Product'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  getAllProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  // Método para obtener productos filtrados pasando una categoria
  getProductsByCategory(category: string) {
    return this.http.get<Product[]>(`${this.apiUrl}?category=${category}`);
  }

  // Método para obtener un producto por su ID
  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }


}
