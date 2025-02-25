import { Component, Input } from '@angular/core';
import { IVideogame } from '../../../shared/model/Ivideogame.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() videogame!: IVideogame;
}
