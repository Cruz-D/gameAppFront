import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVideogame } from '../model/videogame/Ivideogame.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://localhost:7129/api/Videogames'; // URL de la API

  constructor(private http: HttpClient) { }

  getGames(): Observable<IVideogame[]> {
    return this.http.get<IVideogame[]>(this.apiUrl); // Realiza el GET a la API
  }
}
