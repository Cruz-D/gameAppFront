import { Product } from './../../../core/model/product/Iproduct.Interface';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cartServices/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [CommonModule, RouterModule],
})
export class CardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price.value,
      quantity: 1,
      image: product.images[0]?.url || 'assets/images/default-product.png'
    });
  }
}
