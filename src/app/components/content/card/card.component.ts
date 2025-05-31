import { Component, Input } from '@angular/core';
import { IVideogame } from '../../../core/model/videogame/Ivideogame.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() videogame!: IVideogame;
}
