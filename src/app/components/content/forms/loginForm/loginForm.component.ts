import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ILoginUser } from '../../../../core/model/user/ILoginUser.interface';
import { AuthService } from '../../../../core/services/authService/auth.service';

@Component({
  selector: 'app-loginForm',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const loginData: ILoginUser = {
        usernameOrEmail: this.loginForm.value.usernameOrEmail,
        password: this.loginForm.value.password
      };

      this.authService.login(loginData).subscribe({
        next: (response) => {
          // Almacenar el token JWT en una cookie segura
          document.cookie = `jwt=${encodeURIComponent(response.accessToken)}; path=/; samesite=strict; secure`;

          console.log('Login successful', response);

          // Redirigir a la página principal
          window.location.href = '/';
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Login failed', error);
          this.isSubmitting = false;
        }
      });
    } else {
      console.error('Form is invalid');
      this.loginForm.markAllAsTouched();
    }
  }
}
