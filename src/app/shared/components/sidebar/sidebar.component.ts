import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../core/services/authService/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterModule]
})
export class SidebarComponent implements OnInit {

  @Input() isOpen: boolean = false;
  @Output() closeSidebar = new EventEmitter<void>();
  username: string = '';
  userId: string = ''; // Variable para almacenar el ID del usuario

  constructor(public authServices: AuthService) {}

  ngOnInit(): void {

    // Obtiene el token JWT de las cookies
    const token = this.authServices.getToken();
    // Verifica si el token existe
    if (token) {
      console.log('Token JWT encontrado:', token);
      // Decodifica el token JWT para obtener el nombre de usuario
      const payload = JSON.parse(atob(token.split('.')[1]));

      // Asigna el nombre de usuario al componente
      this.username = payload.unique_name || 'Usuario';

      // asignar id
      this.userId = payload.sub || ''; // Asigna el ID del usuario desde el token JWT
      console.log('ID del usuario:', this.userId);

    } else {
      console.log('No se encontró el token JWT');
      this.username = 'Usuario'; // Valor por defecto si no hay token
    }
  }


 logout() {
    this.authServices.logout();
    this.closeSidebar.emit();
  }

  close() {
    this.closeSidebar.emit();
  }

}
