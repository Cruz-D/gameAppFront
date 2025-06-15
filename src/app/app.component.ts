import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CartWidgetComponent } from './components/content/cart-widget/cart-widget.component';
import { CartSidebarComponent } from './components/content/cart-sidebar/cart-sidebar.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    CartWidgetComponent,
    CartSidebarComponent
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'gameAppFront';
}
