import { Component, OnInit } from '@angular/core';
import { ResizeImageDirective } from '../../../shared/directives/resizeImage/resize-image.directive';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/productService/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/model/product/Iproduct.Interface';
@Component({
  selector: 'app-details',
  imports: [ResizeImageDirective, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  product?: Product;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No se ha proporcionado un ID de producto válido.';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (prod) => {
        this.product = prod;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el producto. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });
  }
}
