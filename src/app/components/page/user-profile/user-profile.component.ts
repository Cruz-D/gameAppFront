import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class PerfilUsuarioComponent {
  // Formularios reactivos
  profileForm: FormGroup;
  securityForm: FormGroup;

  // Direcciones y métodos de pago
  addresses: string[] = [];
  newAddress: string = '';
  payments: string[] = [];
  newPayment: string = '';

  constructor(private fb: FormBuilder) {
    // Inicialización de formularios
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: ['']
    });

    this.securityForm = this.fb.group({
      email: [''],
      newPassword: [''],
      repeatPassword: ['']
    });
  }

  // Métodos básicos para evitar errores en el HTML
  updateProfile() {
    // Lógica para actualizar perfil
  }

  updateSecurity() {
    // Lógica para actualizar email/contraseña
  }

  addAddress() {
    // Lógica para mostrar input de nueva dirección (opcional)
  }

  saveAddress() {
    if (this.newAddress.trim()) {
      this.addresses.push(this.newAddress.trim());
      this.newAddress = '';
    }
  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  addPayment() {
    // Lógica para mostrar input de nuevo método de pago (opcional)
  }

  savePayment() {
    if (this.newPayment.trim()) {
      this.payments.push(this.newPayment.trim());
      this.newPayment = '';
    }
  }

  removePayment(index: number) {
    this.payments.splice(index, 1);
  }
}
