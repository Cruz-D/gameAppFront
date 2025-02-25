import { Routes } from '@angular/router';
import { IndexComponent } from '../app/pages/Index/index.component';
import { CardComponent } from './components/content/card/card.component';
import { LoginFormComponent } from './components/Forms/loginForm/loginForm.component';
import { RegisterFormComponent } from './components/Forms/registerForm/registerForm.component';
import { DetailsComponent } from '../app/pages/details/details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirigir la ruta raíz a 'home'
  { path: 'home', component: IndexComponent, data: { title: 'Home' } },
  // Agrega más rutas aquí según sea necesario
  { path: 'card', component: CardComponent, data: { title: 'card' } },
  { path: 'login', component: LoginFormComponent, data: { title: 'login' } },
  { path: 'register', component: RegisterFormComponent, data: { title: 'register' } },
  { path: 'details', component: DetailsComponent, data: { title: 'details' } }

];
