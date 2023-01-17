import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  addBook(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/books`, data);
  }

  updateBook(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/books/${id}`, data);
  }

  getBookList(): Observable<any> {
    return this.http.get(`http://localhost:3000/books`);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
