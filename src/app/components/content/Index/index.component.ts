import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { IVideogame } from '../../../model/Ivideogame.interface';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { PaginatorComponent } from '../../page/paginator/paginator.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  standalone: true,
  imports: [CommonModule, CardComponent, PaginatorComponent]
})
export class IndexComponent implements OnInit {
  games: IVideogame[] = []; // Array para almacenar todos los videojuegos
  paginatedGames: IVideogame[] = []; // Array para almacenar los videojuegos paginados
  totalItems: number = 0; // Número total de videojuegos
  itemsPerPage: number = 8; // Número de videojuegos por página
  currentPage: number = 1; // Página actual

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // Obtener los videojuegos del servicio y actualizar los datos
    this.gameService.getGames().subscribe((data: IVideogame[]) => {
      this.games = data; // Almacenar todos los videojuegos
      this.totalItems = data.length; // Actualizar el número total de videojuegos
      this.updatePaginatedGames(); // Actualizar los videojuegos paginados
    });
  }

  // Actualizar los videojuegos paginados según la página actual
  updatePaginatedGames(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Índice de inicio de la página actual
    const endIndex = startIndex + this.itemsPerPage; // Índice de fin de la página actual
    this.paginatedGames = this.games.slice(startIndex, endIndex); // Obtener los videojuegos para la página actual
  }

  // Manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage = page; // Actualizar la página actual
    this.updatePaginatedGames(); // Actualizar los videojuegos paginados
  }
}
