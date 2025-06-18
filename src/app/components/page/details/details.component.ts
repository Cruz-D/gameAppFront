import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/productService/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/model/product/Iproduct.Interface';
import { CommentsModuleComponent } from '../../content/comments/comments.component';
import { CartService } from '../../../core/services/cartServices/cart.service';
@Component({
  selector: 'app-details',
  imports: [
     CommonModule, CommentsModuleComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  // Propiedades del componente
  //---------------------------------------------//
  // Aquí se define el producto que se mostrará en los detalles
  product?: Product;
  // Propiedad para manejar el estado de carga
  loading: boolean = true;
  // Propiedad para manejar errores al cargar el producto
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  addToCart(product: Product) {
    this.cartService.addToCart({
      productId: product.id,
      name: product.name,
      price: product.price.value,
      quantity: 1,
      image: product.images[0]?.url || 'assets/images/default-product.png'
    });
}

  ngOnInit(): void {
    // Obtener el ID del producto de la ruta
    const id = this.route.snapshot.paramMap.get('id');
    // Verificar si el ID es válido
    if (!id) {
      // Si no se proporciona un ID, establecer un mensaje de error y detener la carga
      this.error = 'No se ha proporcionado un ID de producto válido.';
      this.loading = false;
      return;
    }
    // Cargar el producto por ID
    this.loading = true;
    this.error = null; // Reiniciar el error antes de la carga
    this.productService.getProductById(id).subscribe({
      // Manejar la respuesta exitosa
      next: (prod) => {
        // Asignar el producto recibido a la propiedad del componente
        this.product = prod;
        this.loading = false;
      },
      // Manejar el error al cargar el producto
      error: (err) => {
        this.error = 'No se pudo cargar el producto. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });
  }


  // Metodo apra obtener los comentarios del producto
  getCommentsByProductId(productId: string) {
    return this.productService.getCommentsByProductId(productId);
  }
}
