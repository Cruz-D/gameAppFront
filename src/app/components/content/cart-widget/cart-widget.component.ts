import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cartServices/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-widget',
  imports: [CommonModule],
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.css'
})
export class CartWidgetComponent {
   constructor(public cartService: CartService) {}
}
