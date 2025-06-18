import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../../core/services/orderService/order.service';
import { AuthService } from '../../../core/services/authService/auth.service';
import  {ICreateOrder} from '../../../core/model/Order/ICreateOrder.interface';
import { IGetOrder } from '../../../core/model/Order/IGetOrder.interrface';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  loading: boolean = true;
  orders: IGetOrder[] = [];

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.loadOrders();
  }

  loadOrders() {
    const userId = this.authService.getUserIdFromToken(); // Obtener el ID del usuario autenticado
    this.orderService.getOrdersByUserId(userId).subscribe((data: any) => {
      this.orders = data;
      this.loading = false;
    });
  }

  createOrder(order: ICreateOrder) {

    // asignar parametros de la orden
    order.userId = this.authService.getUserIdFromToken(); // Obtener el ID del usuario autenticado
    order.id = 'n'; // El ID se generará en el servidor
    order.orderDate = new Date().toISOString(); // Fecha de creación
    order.stateOfOrder = 'Pending'; // Estado inicial de la orden
    order.orderId = 'new'; // Inicializar el precio total a 0
    order.receivedDate = new Date().toISOString(); // Fecha de recepción inicializada a la fecha actual
    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('Orden creada con éxito:', response);
        this.loadOrders(); // Recargar las órdenes después de crear una nueva
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
      }
    });
  }
}


