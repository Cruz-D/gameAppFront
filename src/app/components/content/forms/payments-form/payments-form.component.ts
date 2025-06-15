import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/userService/user.service';
import { AuthService } from '../../../../core/services/authService/auth.service';

@Component({
  selector: 'app-payments-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payments-form.component.html',
  styleUrls: ['./payments-form.component.css']
})
export class PaymentsFormComponent {
  @Output() save = new EventEmitter<any>();

  paymentForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) {

    this.paymentForm = this.fb.group({
      tipo: ['', Validators.required],
      ultimosDigitos: ['', [Validators.required, Validators.maxLength(8)]],
      paymentProvider: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const userId = this.authService.getUserIdFromToken();
      const paymentData = {
        ...this.paymentForm.value,
        paymentMethodId: 'new', // Este campo se puede generar o asignar según la lógica de tu aplicación
        userId: userId,
      }
      this.userService.updatePaymentMethod(userId,[paymentData]).subscribe({
        next: (response) => {
          console.log('Payment method added successfully:', response);
        },
        error: (error) => {
          console.error('Error adding payment method:', error);
        }
      });
      this.save.emit(this.paymentForm.value);

      this.paymentForm.reset();
    }
  }
}
