import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cartServices/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-sidebar.component.html',
  styleUrl: './cart-sidebar.component.css'
})
export class CartSidebarComponent {
    constructor(public cartService: CartService) {}
}
