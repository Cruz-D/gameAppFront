import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IResponseUser } from '../../../core/model/user/IResponseUser.interface';
import { IAddressUser } from '../../../core/model/user/IAddressUser.interface';
import { UserService } from '../../../core/services/userService/user.service';
import { AuthService } from '../../../core/services/authService/auth.service';
import { AddressesFormComponent } from '../../content/forms/addresses-form/addresses-form.component';
import { PaymentsFormComponent } from '../../content/forms/payments-form/payments-form.component';
import { IBillingUser } from '../../../core/model/user/IBillingUser.interface';
import { IEmailUpdate } from '../../../core/model/user/IEmailUpdate.interface';
import { UpdateEmailFormComponent } from '../../content/forms/update-email-form/update-email-form.component';
import { IPasswordUpdate } from '../../../core/model/user/IPasswordUpdate.interface';
import { UpdatePassFormComponent } from '../../content/forms/update-pass-form/update-pass-form.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AddressesFormComponent,
    PaymentsFormComponent,
    UpdateEmailFormComponent,
    UpdatePassFormComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class PerfilUsuarioComponent implements OnInit, AfterViewInit {
  // -------------------- Formularios reactivos --------------------
  profileForm: FormGroup;
  securityForm: FormGroup;

  // -------------------- Datos del usuario --------------------
  userData: IResponseUser | null = null;

  // -------------------- Direcciones y métodos de pago --------------------
  addresses: IAddressUser[] = [];
  payments: IBillingUser[] = [];

  // -------------------- Control de formularios de direcciones --------------------
  showAddressForm = false;
  addressToEdit: IAddressUser | null = null;

  // -------------------- Control de formularios de pagos --------------------
  showPaymentForm = false;
  paymentToEdit: IBillingUser | null = null;

  // -------------------- Control de formularios de email y contraseña --------------------
  showEmailForm = false;
  showPassForm = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    // Inicialización de formularios de perfil y seguridad
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [''],
      role: [{ value: '', disabled: true }],
      isVerified: [{ value: '', disabled: true }],
    });

    this.securityForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: [''],
      repeatPassword: [''],
    });
  }

  // -------------------- Ciclo de vida --------------------
  ngOnInit(): void {
    this.getUserInfo();
    this.getAdrresses();
    this.getPayments();
  }

  ngAfterViewInit(): void {
    // Escucha el cambio de pestaña usando Bootstrap 5
    const tabs = document.querySelectorAll(
      '#profileTabs a[data-bs-toggle="tab"]'
    );
    tabs.forEach((tab) => {
      tab.addEventListener('shown.bs.tab', (event: any) => {
        this.onTabClick(event);
      });
    });
  }

  // -------------------- Gestión de pestañas --------------------
  onTabClick(event: any) {
    // Bootstrap 5: event.target.getAttribute('href') devuelve el id de la pestaña
    const tabId = event.target.getAttribute('href');
    if (tabId === '#datos') {
      this.getUserInfo();
    } else if (tabId === '#direcciones') {
      this.getAdrresses();
    } else if (tabId === '#pagos') {
      this.getPayments();
    }
    // Puedes añadir más pestañas si lo necesitas
  }

  // -------------------- DATOS PERSONALES --------------------
  /**
   * Obtiene la información del usuario y actualiza los formularios.
   */
  getUserInfo() {
    const token = this.authService.getUserIdFromToken();
    if (token) {
      this.userService.getUserInfo(token).subscribe(
        (response: IResponseUser) => {
          this.userData = response;
          this.profileForm.patchValue({
            firstName: response.firstName,
            lastName: response.lastName,
            dateOfBirth: response.dateOfBirth
              ? new Date(response.dateOfBirth).toISOString().substring(0, 10)
              : '',
            role: response.role,
            isVerified: response.isVerified ? 'Sí' : 'No',
          });
          this.securityForm.patchValue({
            email: response.email,
          });
          this.addresses = response.addresses || [];
          this.payments = response.paymentInfo || [];
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    }
  }

  /**
   * Actualiza los datos del perfil del usuario.
   */
  updateProfile() {
    const token = this.authService.getUserIdFromToken();
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
    if (this.profileForm.valid && this.userData) {
      const updatedUser = {
        ...this.userData,
        ...this.profileForm.getRawValue(),
      };
      if (updatedUser.dateOfBirth) {
        updatedUser.dateOfBirth = new Date(
          updatedUser.dateOfBirth
        ).toISOString();
      }
      this.userService.updateUserInfo(token, updatedUser).subscribe({
        next: () => {
          this.getUserInfo();
        },
        error: () => {
          console.error('Error al actualizar el perfil');
        },
      });
    }
  }

  // -------------------- SEGURIDAD --------------------
  /**
   * Maneja la actualización del email.
   */
  onEmailUpdate(emailUpdate: IEmailUpdate) {
    this.showEmailForm = false;
    // Aquí llama a tu servicio para actualizar el email
    // this.userService.updateEmail(emailUpdate).subscribe(...)
  }

  /**
   * Maneja la actualización de la contraseña.
   */
  onPasswordUpdate(passUpdate: IPasswordUpdate) {
    this.showPassForm = false;
    // Aquí llama a tu servicio para actualizar la contraseña
    // this.userService.updatePassword(passUpdate).subscribe(...)
  }

  // -------------------- DIRECCIONES --------------------
  /**
   * Muestra el formulario para añadir una nueva dirección.
   */
  addAddress() {
    this.addressToEdit = null;
    this.showAddressForm = true;
  }

  /**
   * Obtiene todas las direcciones del usuario.
   */
  getAdrresses() {
    try {
      const token = this.authService.getUserIdFromToken();
      if (token) {
        this.userService.getAddresses(token).subscribe({
          next: (addresses: IAddressUser[]) => {
            this.addresses = addresses;
            // console.log('Direcciones obtenidas:', this.addresses);
          },
          error: (err) => console.error('Error al obtener direcciones:', err),
        });
      } else {
        console.error('Token no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener direcciones:', error);
    }
  }

  /**
   * Muestra el formulario para editar una dirección existente.
   */
  editAddress(address: IAddressUser) {
    this.addressToEdit = { ...address }; // Clona el objeto para evitar mutaciones directas
    this.showAddressForm = true;

  }

  /**
   * Maneja el guardado de una dirección (añadir o editar).
   */
  onAddressSave(address: IAddressUser) {
    this.showAddressForm = false;
    this.addressToEdit = null;
    this.getAdrresses(); // Recarga solo las direcciones
  }

  /**
   * Marca una dirección como predeterminada.
   */
  setDefaultAddress(addressId: string) {
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('userId no encontrado');
      return;
    }
    this.userService.getAddresses(userId).subscribe({
      next: (addresses) => {
        if (addresses) {
          // Primero, desmarcar todas las direcciones como predeterminadas
          addresses.forEach((addr: any) => {
            addr.isDefault = false;
          });

          // Luego, marcar la dirección seleccionada como predeterminada
          const addressToUpdate = addresses.find(
            (addr: any) => addr.addressId === addressId
          );
          if (addressToUpdate) {
            addressToUpdate.isDefault = true;
            // Enviar la actualización al servidor
            this.userService
              .updateAddress(userId, [addressToUpdate])
              .subscribe({
                next: () => this.getAdrresses(),
                error: (err) =>
                  console.error('Error al actualizar la dirección:', err),
              });
          } else {
            console.error('Dirección no encontrada para actualizar');
          }
        }
      },
      error: (err) => console.error('Error al obtener direcciones:', err),
    });
  }

  /**
   * Elimina una dirección del usuario.
   */
  removeAddress(addressId: string) {
    if (confirm('¿Seguro que deseas eliminar esta dirección?')) {
      if (!addressId) {
        console.error('ID de dirección no válido');
        return;
      }
      //Contruir una interfaz para enviar datos
      const data = {
        addressId: addressId,
        userId: this.authService.getUserIdFromToken(),
      };
      const token = this.authService.getUserIdFromToken();
      this.userService.deleteAddress(token, data).subscribe({
        next: () => this.getAdrresses(),
        error: (err) => console.error('Error al eliminar la dirección:', err),
      });
    }
  }

  // -------------------- MÉTODOS DE PAGO --------------------
  /**
   * Muestra el formulario para añadir un nuevo método de pago.
   */
  addPayment() {
    this.paymentToEdit = null;
    this.showPaymentForm = true;
  }

  /**
   * Muestra el formulario para editar un método de pago existente.
   */
  editPayment(payment: IBillingUser) {
    this.paymentToEdit = { ...payment };
    this.showPaymentForm = true;
  }

  /**
   * Obtiene todos los métodos de pago del usuario.
   */
  getPayments() {
    const token = this.authService.getUserIdFromToken();
    if (token) {
      this.userService.getPaymentMethods(token).subscribe({
        next: (payments: IBillingUser[]) => {
          this.payments = payments;
          // console.log('Pagos obtenidos:', this.payments);
        },
        error: (err: any) =>
          console.error('Error al obtener métodos de pago:', err),
      });
    } else {
      console.error('Token no encontrado');
    }
  }

  /**
   * Maneja el guardado de un método de pago (añadir o editar).
   */
  onPaymentSave(payment: IBillingUser) {
    this.getPayments(); // Recarga los métodos de pago tras guardar
    this.showPaymentForm = false;

  }

  /**
   * Elimina un método de pago del usuario.
   * (Recuerda implementar la llamada al backend)
   */
  removePayment(paymentMethodId: string) {
    if (!paymentMethodId) {
      console.error('ID de método de pago no válido');
      return;
    }

    if (!confirm('¿Seguro que deseas eliminar este método de pago?')) {
      return;
    }
    const userId = this.authService.getUserIdFromToken();
    if (!userId) {
      console.error('userId no encontrado');
      return;
    }
    const data = {
      paymentMethodId: paymentMethodId,
      userId: userId,
    }
    // Aquí deberías llamar a tu servicio para eliminar el método de pago
    this.userService.deletePaymentMethod(userId, data).subscribe({
      next: () => {
        this.getPayments(); // Recarga los métodos de pago tras eliminar
      },
      error: (err) =>
        console.error('Error al eliminar el método de pago:', err),
    });
  }
}
