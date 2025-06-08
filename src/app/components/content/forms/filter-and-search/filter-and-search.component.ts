import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../core/model/product/Iproduct.Interface';
import { ProductService } from '../../../../core/services/productService/product.service';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from '../../../../shared/components/paginator/paginator.component';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'app-filter-and-search',
  imports: [FormsModule, CommonModule, RouterModule, PaginatorComponent, CardComponent],
  templateUrl: './filter-and-search.component.html',
  styleUrl: './filter-and-search.component.css'
})
export class FilterAndSearchComponent implements OnInit {

  // Inyección del servicio de productos
  constructor(private productService: ProductService) {}

  product: Product[] = []; // Array para almacenar todos los videojuegos
  paginatedProducts: Product[] = []; // Array para almacenar los videojuegos paginados
  totalItems: number = 0; // Número total de videojuegos
  itemsPerPage: number = 8; // Número de videojuegos por página
  currentPage: number = 1; // Página actual

  // Array con todos los productos obtenidos del servicio
  products: Product[] = [];
  // Array con los productos filtrados según los filtros seleccionados
  filteredProducts: Product[] = [];
  // Arrays para almacenar las opciones únicas de cada filtro
  productCategories: string[] = [];
  platforms: string[] = [];
  brands: string[] = [];
  tags: string[] = [];

  // Objeto que almacena el estado actual de los filtros seleccionados por el usuario
  filters = {
    productCategory: '',      // Categoría seleccionada
    platform: '',             // Plataforma seleccionada
    brand: '',                // Marca seleccionada
    year: null as number | null,        // Año de lanzamiento seleccionado
    priceMin: null as number | null,    // Precio mínimo
    priceMax: null as number | null,    // Precio máximo
    tag: '',                  // Tag seleccionado
    discountOnly: false,      // Solo productos con descuento
    stockOnly: false          // Solo productos en stock
  };

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Inicializa el array de productos filtrados vacío
    this.filteredProducts = this.products;
    // Obtiene los productos desde el servicio al cargar el componente
    this.getProducts();
    // Extrae las opciones de filtros únicas (vacío al inicio, se actualizará tras obtener productos)
    this.extractFilters();
  }

  /**
   * Extrae las opciones únicas para cada filtro a partir del array de productos.
   * Se utiliza un Set para evitar duplicados y luego se convierte a array.
   * Esto permite que los selects de filtros solo muestren opciones válidas.
   */
  extractFilters(): void {
    this.productCategories = [...new Set(this.products.map(p => p.productCategory))];
    this.platforms = [...new Set(this.products.map(p => p.details.platform))];
    this.brands = [...new Set(this.products.map(p => p.details.brand))];
    this.tags = [...new Set(this.products.flatMap(p => p.tags))];
  }

  /**
   * Llama al servicio para obtener todos los productos.
   * Una vez obtenidos, los asigna a los arrays y extrae las opciones de filtros.
   */
  getProducts(): void {
  this.productService.getAllProducts().subscribe((products: Product[]) => {
    this.products = products;
    this.filteredProducts = products; // Inicialmente, muestra todos los productos
    this.totalItems = products.length; // Actualiza el total de productos
    this.extractFilters(); // Actualiza las opciones de los filtros
    this.updatePaginatedGames(); // Muestra la primera página de productos
  });
}

  /**
   * Aplica los filtros seleccionados por el usuario sobre el array de productos.
   * Cada filtro se evalúa y solo los productos que cumplen todas las condiciones permanecen en el array filtrado.
   * Este método se llama cada vez que el usuario cambia un filtro.
   */
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Filtro por categoría
      const matchesCategory = this.filters.productCategory
        ? product.productCategory === this.filters.productCategory
        : true;
      // Filtro por plataforma
      const matchesPlatform = this.filters.platform
        ? product.details.platform === this.filters.platform
        : true;
      // Filtro por marca
      const matchesBrand = this.filters.brand
        ? product.details.brand === this.filters.brand
        : true;
      // Filtro por año de lanzamiento
      const matchesYear = this.filters.year
        ? product.details.releaseYear === this.filters.year
        : true;
      // Filtro por precio mínimo
      const matchesPriceMin = this.filters.priceMin
        ? product.price.value >= this.filters.priceMin
        : true;
      // Filtro por precio máximo
      const matchesPriceMax = this.filters.priceMax
        ? product.price.value <= this.filters.priceMax
        : true;
      // Filtro por tag
      const matchesTag = this.filters.tag
        ? product.tags.includes(this.filters.tag)
        : true;
      // Filtro por descuento
      const matchesDiscount = this.filters.discountOnly
        ? product.price.discount != null
        : true;
      // Filtro por stock disponible
      const matchesStock = this.filters.stockOnly
        ? product.stock.available
        : true;

      // Solo se incluye el producto si cumple todos los filtros
      return (
        matchesCategory &&
        matchesPlatform &&
        matchesBrand &&
        matchesYear &&
        matchesPriceMin &&
        matchesPriceMax &&
        matchesTag &&
        matchesDiscount &&
        matchesStock
      );
    });
    this.currentPage = 1; // Reinicia a la primera página
    this.totalItems = this.filteredProducts.length; // Actualiza el total
    this.updatePaginatedGames(); // Actualiza la paginación
  }

  updatePaginatedGames(): void {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
}

  // Maneja el cambio de página en el paginador
  onPageChange(page: number): void {
    this.currentPage = page; // Actualiza la página actual
    this.updatePaginatedGames(); // Actualiza los videojuegos paginados
  }


}
