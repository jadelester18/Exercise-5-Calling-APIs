import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  addBlog(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/blogs`, data);
  }

  updateBlog(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/blogs/${id}`, data);
  }

  getBlogList(): Observable<any> {
    return this.http.get(`http://localhost:3000/blogs`);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/blogs/${id}`);
  }
}
