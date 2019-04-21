import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base =  'http://localhost:8000/resources';

  getPostById(id: number) {
    return `${this.base}/post/${id}`;
  }

  getArchives() {
    return `${this.base}/index/archive`;
  }

  getArchivesOf(year: number, month: number) {
    return `${this.base}/index/archive/${year}/${month}`;
  }

  searchPosts() {
    return `${this.base}/index/query`;
  }

  indexPosts() {
    return `${this.base}/index`;
  }

  publishComment() {
    return `${this.base}/post/comment`;
  }

  constructor() { }
}
