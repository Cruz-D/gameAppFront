import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/userService/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IAddressUser } from '../../../core/model/user/IAddressUser.interface';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/authService/auth.service';
import { AddressesFormComponent } from '../../content/forms/addresses-form/addresses-form.component';
import { PaymentsFormComponent } from '../../content/forms/payments-form/payments-form.component';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, FormsModule, RouterModule, AddressesFormComponent, PaymentsFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  //obtener sub del token jwt almacenado en cookies

  userId: any; // Obtén el userId del token o del servicio de auth
  addresses: IAddressUser[] = [];
  paymentMethods: any[] = [];
  selectedAddressId: string | null = null;
  selectedPaymentId: string | null = null;

  showAddressForm = false;
  showPaymentForm = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Aquí deberías obtener el userId del token JWT
    this.userId = this.getUserIdFromToken();
    this.userService
      .getAddresses(this.userId)
      .subscribe((res) => (this.addresses = res || []));
    this.userService
      .getPaymentMethods(this.userId)
      .subscribe((res) => (this.paymentMethods = res || []));
  }

  getUserIdFromToken(): string {
    const token = this.authService?.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.sub || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  onAddressAdded(address: any) {
    this.showAddressForm = false;
    // Recarga tus direcciones aquí
  }

  onPaymentAdded(payment: any) {
    this.showPaymentForm = false;
    // Recarga tus métodos de pago aquí
  }

  continuarPago() {
    // Navega a la pasarela de pago, pasando los datos seleccionados
    // Por ejemplo, usando el router:
    // this.router.navigate(['/payment-gateway'], { state: { addressId: this.selectedAddressId, paymentId: this.selectedPaymentId } });
  }
}
