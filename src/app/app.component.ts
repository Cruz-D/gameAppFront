import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/page/header/header.component';
import { NavbarComponent } from './core/components/page/navbar/navbar.component';
import { FooterComponent } from './core/components/page/footer/footer.component';
import { IndexComponent } from '../app/pages/Index/index.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,

  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gameAppFront';
}
