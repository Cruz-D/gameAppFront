import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/page/header/header.component';
import { NavbarComponent } from './components/page/navbar/navbar.component';
import { FooterComponent } from './components/page/footer/footer.component';
import { IndexComponent } from './components/content/Index/index.component';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    IndexComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gameAppFront';
}
