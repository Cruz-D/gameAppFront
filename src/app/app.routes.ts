import { Routes } from '@angular/router';
import { IndexComponent } from './components/content/Index/index.component';
import { CardComponent } from './components/content/card/card.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirigir la ruta raíz a 'home'
  { path: 'home', component: IndexComponent, data: { title: 'Home' } },
  // Agrega más rutas aquí según sea necesario
  { path: 'card', component: CardComponent, data: { title: 'card' } },
];
