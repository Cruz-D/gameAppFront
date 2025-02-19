import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import { IVideogame } from '../../../model/Ivideogame.interface';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-contentFather',
  templateUrl: './contentFather.component.html',
  styleUrls: ['./contentFather.component.css'],
  standalone: true,
  imports: [CommonModule, CardComponent]
})
export class ContentFatherComponent implements OnInit {
  games: IVideogame[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe((data: IVideogame[]) => {
      this.games = data;
    });
  }
}
