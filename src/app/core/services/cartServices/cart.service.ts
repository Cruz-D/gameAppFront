import { Injectable } from '@angular/core';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  items: CartItem[] = [];
  showCart = false;

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  addToCart(item: CartItem) {
    const found = this.items.find(i => i.productId === item.productId);
    if (found) {
      found.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeFromCart(productId: string) {
    this.items = this.items.filter(i => i.productId !== productId);
  }

  clearCart() {
    this.items = [];
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
