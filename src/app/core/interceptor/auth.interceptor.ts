import { AuthService } from './../services/authService/auth.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    // Excluir la petición de login
  if (req.url.includes('/api/Auth/login')) {
    return next(req);
  }
  // Inyectar el servicio de autenticación
  const authService = inject(AuthService);
  // Obtener el token JWT de las cookies
  const token = authService.getToken();

  console.log('Token JWT interceptado:', token);

  try {
    if (token) {
      // Clonar la solicitud y agregar el token JWT al encabezado Authorization
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Solicitud clonada con token JWT:', clonedRequest);

      // Continuar con la solicitud clonada
      return next(clonedRequest);
    }
  } catch (error) {
    console.error('Error extracting token from cookie:', error);

  }


  return next(req);
};
