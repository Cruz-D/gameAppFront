import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // URL de la API
  private apiUrl = 'https://gamehub-develop-e0edejfhhtbjg3gd.canadacentral-01.azurewebsites.net/api/Orders';


  constructor(private http: HttpClient) { }

  // Método para crear una nueva orden
  createOrder(order: any) {
    return this.http.post(`${this.apiUrl}`, order);
  }
  // Método para obtener todas las órdenes de un usuario
  getOrdersByUserId(userId: string) {
    return this.http.get(`${this.apiUrl}/ByUser/${userId}`);
  }


}
