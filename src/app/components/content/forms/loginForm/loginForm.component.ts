
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/authService/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginUser } from '../../../../core/model/users/ILoginUser.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-loginForm',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.css']
})
export class LoginFormComponent implements OnInit {

  // ***************************************************************
  // * Variables Section
  // ***************************************************************

  // variable que almacena el formulario de login
  loginForm!: FormGroup;

  ILoginUser: ILoginUser = {
    usernameOrEmail: '',
    password: ''
  };

  // ***************************************************************

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {

    // Inicializacion y validacion de los campos del formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }

  // ***************************************************************

  loginUser() {

    // Verifica si el formulario es valido
    if (this.loginForm.valid) {

      // Asigna los valores del formulario a la interfaz ILoginUser
      const loginData: ILoginUser = {
        usernameOrEmail: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      // Llama al servicio de autenticación usando la interfaz
      this.authService.login(loginData).subscribe(

        // Si la respuesta es exitosa, guarda el token en una cookie
        response => {
          document.cookie = `jwt=${response.token}; path=/; samesite=strict`;
          console.log('Login successful', response);
        },
        error => {
          console.error('Login failed', error);
        }
      );
    } else {
      // Si no es valido, imprime un mensaje de error en la consola
      console.error('Form is invalid');
    }
  }


}
