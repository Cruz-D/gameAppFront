
import { Routes } from '@angular/router';
import { IndexComponent } from './components/page/Index/index.component';
import { GameLibraryComponent } from './components/page/game-library/game-library.component';
import { CardComponent } from './components/content/card/card.component';
import { LoginFormComponent } from './components/content/forms/loginForm/loginForm.component';
import { RegisterComponent } from './components/content/forms/registerForm/registerForm.component';
import { DetailsComponent } from './components/page/details/details.component';
import { PerfilUsuarioComponent } from './components/page/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirigir la ruta raíz a 'home'
  { path: 'home', component: IndexComponent, data: { title: 'Home' } },
  // Agrega más rutas aquí según sea necesario
  { path: 'productos', component: GameLibraryComponent, data: { title: 'productos' } },
  { path: 'login', component: LoginFormComponent, data: { title: 'login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'register' } },
  { path: 'details', component: DetailsComponent, data: { title: 'details' } },
  { path: 'details/:id', component: DetailsComponent, data: { title: 'details' } },
  { path: 'profile/:id', component: PerfilUsuarioComponent, data: { title: 'profile' } },

];
