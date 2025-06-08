import { Product } from './../../../core/model/product/Iproduct.Interface';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [CommonModule, RouterModule],
})
export class CardComponent {
  @Input() product!: Product;
}
