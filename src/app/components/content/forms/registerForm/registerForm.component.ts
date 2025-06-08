import { IRegisterUser } from './../../../../core/model/user/IRegisterUser.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/authService/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword: boolean = false;
  showRepPassword: boolean = false;
  isSubmitting: boolean = false;

  IRegisterUser: IRegisterUser = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    lastName2: '',
    dateOfBirth: '',
    profilePictureUrl: ''
  }

  constructor(private fb: FormBuilder, private AuthService: AuthService, private http: HttpClient) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).{8,}$')]],
      RepPassword: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]+$')]],
      lastName2: ['', [Validators.required, Validators.pattern('^[a-zA-Z\s]+$')]],
      dateOfBirth: ['', [Validators.required]],


      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('RepPassword')?.value
      ? null : { mismatch: true };
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'repPassword') {
      this.showRepPassword = !this.showRepPassword;
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      // Simula la generación de una URL (reemplazar con carga real al servidor)
      this.registerForm.patchValue({
        profilePictureUrl: URL.createObjectURL(file)
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;

      this.IRegisterUser = {
        username: this.registerForm.get('username')?.value,
        password: this.registerForm.get('password')?.value,
        email: this.registerForm.get('email')?.value,
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        lastName2: this.registerForm.get('lastName2')?.value,
        dateOfBirth: this.registerForm.get('dateOfBirth')?.value,
        profilePictureUrl: 'https://inkscape.app/wp-content/uploads/imagen-vectorial.webp', // Aquí puedes manejar la URL de la imagen
      };

      this.AuthService.register(this.IRegisterUser).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.isSubmitting = false;
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.isSubmitting = false;
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
        }

      });
    }
  }
}
