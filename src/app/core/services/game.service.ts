/* import { Injectable } from '@angular/core';

import { IVideogame } from '../../model/Ivideogame.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly API_URL: string = 'https://api.igdb.com/v4/games';

  constructor(private http: HttpClient) { }

  getGames(): Observable<IVideogame[]> {
    const headers = new HttpHeaders({
      'Client-ID': 'dsnon0lo4566kwi854qyb2v4lxdq9h',
      'Authorization': 'Bearer ld7gp83xuc8wiljlxpm0q1anqemufg'
    });

    const body = `
      fields id, name, genres.name, platforms.name, rating, involved_companies.company.name, first_release_date, status, cover.url;
      limit 10;
    `;

    return this.http.post<IVideogame[]>(this.API_URL, body, { headers });
  }
}
 */

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
