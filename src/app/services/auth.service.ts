import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0 && users[0].password === password) {
          localStorage.setItem('currentUser', JSON.stringify(users[0]));
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
}