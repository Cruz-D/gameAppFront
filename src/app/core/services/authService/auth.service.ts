import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginUser } from '../../model/user/ILoginUser.interface';
import { IRegisterUser } from '../../model/user/IRegisterUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:32770/api/Auth';

  constructor(private http: HttpClient) {}

  login(user: ILoginUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  register(user: IRegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Este metodo obtiene el token JWT de las cookies
  // y lo devuelve como una cadena o null si no existe
  getToken(): string | null {
    const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
    return match ? match[2] : null;
  }

  getUserIdFromToken(): string {
    const token = this.getToken();
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
