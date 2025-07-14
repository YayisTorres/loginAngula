import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  searchCharacters(name: string, status?: string, species?: string): Observable<ApiResponse> {
    let params = `?name=${name}`;
    if (status) params += `&status=${status}`;
    if (species) params += `&species=${species}`;
    
    return this.http.get<ApiResponse>(`${this.apiUrl}${params}`);
  }
}