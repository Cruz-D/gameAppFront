import { Component } from '@angular/core';
import { FilterAndSearchComponent } from '../filter-and-search/filter-and-search.component';

@Component({
  selector: 'app-game-library',
  imports: [FilterAndSearchComponent],
  templateUrl: './game-library.component.html',
  styleUrl: './game-library.component.css'
})
export class GameLibraryComponent {

}
