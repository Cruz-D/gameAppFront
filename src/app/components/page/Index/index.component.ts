import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/productService/product.service';
import { Product } from '../../../core/model/product/Iproduct.Interface';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../content/card/card.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class IndexComponent implements OnInit {
  products: Product[] = []; // Array para almacenar todos los videojuegos
  paginatedProducts: Product[] = []; // Array para almacenar los videojuegos paginados
  totalItems: number = 0; // Número total de videojuegos
  itemsPerPage: number = 8; // Número de videojuegos por página
  currentPage: number = 1; // Página actual

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // Obtener los videojuegos del servicio y actualizar los datos
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data; // Almacenar todos los videojuegos
      this.totalItems = data.length; // Actualizar el número total de videojuegos
      this.updatePaginatedGames(); // Actualizar los videojuegos paginados
    });
  }

  // Actualizar los videojuegos paginados según la página actual
  updatePaginatedGames(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Índice de inicio de la página actual
    const endIndex = startIndex + this.itemsPerPage; // Índice de fin de la página actual
    this.paginatedProducts = this.products.slice(startIndex, endIndex); // Obtener los videojuegos para la página actual
  }

  // Manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage = page; // Actualizar la página actual
    this.updatePaginatedGames(); // Actualizar los videojuegos paginados
  }
}
