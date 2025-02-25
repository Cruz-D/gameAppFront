import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class PaginatorComponent {
  @Input() totalItems: number = 0; // Número total de elementos (videojuegos)
  @Input() itemsPerPage: number = 0; // Número de elementos por página
  @Input() currentPage: number = 1; // Página actual
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>(); // Evento que se emite cuando cambia la página

  /**
   * Obtiene el número total de páginas mediante un get
   * get: es una propiedad que se puede leer, pero no se puede modificar
   * @returns Número total de páginas
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage); // Calcula el número total de páginas
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page; // Actualiza la página actual
      this.pageChange.emit(this.currentPage); // Emite el evento de cambio de página
    }
  }
}
