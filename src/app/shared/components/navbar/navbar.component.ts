import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/authService/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule, CommonModule]
})
export class NavbarComponent implements OnInit {

  constructor(public authServices: AuthService) { }

  ngOnInit() {
  }

  // ***************************************************************

  //logout privisonal de formal local
  //gerstionarlo en el servicio de autenticación
  logout() {

    // Verifica si el usuario está autenticado
    if (this.authServices.isLoggedIn()) {
      // Llama al método logout del servicio de autenticación
      this.authServices.logout();

      // Redirige al usuario a la página de inicio de sesión
      window.location.href = '/login';
    }
  }

}
