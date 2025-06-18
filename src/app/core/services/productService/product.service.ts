import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product/Iproduct.Interface';
import { IComment } from '../../model/comments/comments.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://gamehub-develop-e0edejfhhtbjg3gd.canadacentral-01.azurewebsites.net/api/Product'; // URL de la API

  private apiCommentsUrl = 'https://gamehub-develop-e0edejfhhtbjg3gd.canadacentral-01.azurewebsites.net/api/Comments'; // URL de la API para comentarios

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

  getCommentsByProductId(productId: string) {
    return this.http.get<any[]>(`${this.apiCommentsUrl}?productId=${productId}`);
  }

  addComment(comment: IComment) {
    return this.http.post<IComment>(`${this.apiCommentsUrl}`, comment);
  }

  updateComment(comment: IComment) {
    return this.http.put<IComment>(`${this.apiCommentsUrl}/${comment.id}`, comment);
  }

  deleteComment(commentId: string) {
    return this.http.delete(`${this.apiCommentsUrl}/commentId?commentId=${commentId}`);
  }


}
