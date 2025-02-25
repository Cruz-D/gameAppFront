import { Injectable } from '@angular/core';
import { IVideogame } from '../../shared/model/Ivideogame.interface';
import { Observable, of } from 'rxjs';
import { VIDEOGAME_DATA } from '../../shared/model/videogame.datasource';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGames(): Observable<IVideogame[]> {
    return of(VIDEOGAME_DATA);
  }
}
