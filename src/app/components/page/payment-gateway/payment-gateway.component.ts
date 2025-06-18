import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../core/services/orderService/order.service';
import { CartService } from '../../../core/services/cartServices/cart.service';
import { ICreateOrder } from '../../../core/model/Order/ICreateOrder.interface';
import { AuthService } from '../../../core/services/authService/auth.service';

@Component({
  selector: 'app-payment-gateway',
  imports: [CommonModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css',
})
export class PaymentGatewayComponent {
  isProcessing = false;
  paymentSuccess = false;

  constructor(private orderService: OrderService, private router: Router, private cartService: CartService, private authService: AuthService) {}

  procesarPago() {

    this.orderService.createOrder({
      userId: this.authService.getUserIdFromToken(), // Aquí deberías obtener el ID del usuario autenticado
      id: 'n', // El ID se generará en el servidor
      orderDate: new Date().toISOString(), // Fecha de creación
      stateOfOrder: 'Pending', // Estado inicial de la orden
      orderId: 'new', // Inicializar el precio total a 0
      receivedDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // Fecha de recepción
    } as ICreateOrder).subscribe({
      next: (response) => {
        console.log('Orden creada con éxito:', response);
      },
      error: (error) => {
        console.error('Error al crear la orden:', error);
      },
    });
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
    }, 2000); // Simula un pago
    //limpiar carrito o cualquier otra acción necesaria después del pago
    this.cartService.clearCart(); // Limpia el carrito después del pago
    this.router.navigate(['/my-orders']); // Redirige a la página de órdenes después del pago

  }
}
