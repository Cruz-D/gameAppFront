import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginUser } from '../../model/users/ILoginUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/Auth'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(user: ILoginUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // Este metodo obtiene el token JWT de las cookies
  // y lo devuelve como una cadena o null si no existe
  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
    return match ? match[2] : null;
  }

  // Este metodo verifica si el usuario esta autenticado
  // comprobando si el token JWT existe y no es nulo
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Este metodo elimina el token JWT de las cookies

  logout(): void {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // Elimina el token JWT
    window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
  }
}
