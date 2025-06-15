import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  imports: [CommonModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css',
})
export class PaymentGatewayComponent {
  isProcessing = false;
  paymentSuccess = false;

  procesarPago() {
    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
    }, 2000); // Simula un pago
  }
}
