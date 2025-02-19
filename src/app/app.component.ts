import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/page/header/header.component';
import { NavbarComponent } from './components/page/navbar/navbar.component';
import { FooterComponent } from './components/page/footer/footer.component';
import { ContentFatherComponent } from './components/content/contentFather/contentFather.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    ContentFatherComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gameAppFront';
}
