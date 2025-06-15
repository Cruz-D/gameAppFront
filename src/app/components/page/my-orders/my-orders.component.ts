import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  loading: boolean = true;
  orders: any[] = [];

  constructor() {
    // Simular carga de pedidos
    setTimeout(() => {
      this.orders = [
        {
          orderId: 1,
          status: 'Completed',
          createdAt: new Date(),
          items: [
            { productName: 'Producto 1', quantity: 2, price: 100 },
            { productName: 'Producto 2', quantity: 1, price: 50 }
          ],
          total: 250
        },
        {
          orderId: 2,
          status: 'Pending',
          createdAt: new Date(),
          items: [
            { productName: 'Producto 3', quantity: 1, price: 75 }
          ],
          total: 75
        }
      ];
      this.loading = false;
    }, 2000);
  }
}
