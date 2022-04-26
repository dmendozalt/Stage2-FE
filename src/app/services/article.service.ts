import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}
  getArticles() {
    return this.http.get('https://api.plos.org/search?q=title:DNA');
  }
}
