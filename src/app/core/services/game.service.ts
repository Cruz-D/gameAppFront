import { Injectable } from '@angular/core';
import { IVideogame } from '../../model/Ivideogame.interface';
import { Observable, of } from 'rxjs';
import { VIDEOGAME_DATA } from '../../model/videogame.datasource';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGames(): Observable<IVideogame[]> {
    return of(VIDEOGAME_DATA);
  }
}
