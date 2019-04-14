import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = environment['api_site'] || "http://localhost/resources"

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

  constructor() { }
}
