import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/comments.json')
  }

  deleteComments(id: string) {
    return this.http.delete('https://techlead-e4ee9-default-rtdb.firebaseio.com/comments/'+id+'.json');
  }

  getComment(id: string) {
    return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/comments/'+id+'.json');
  }

  getArticles() {
    return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/articles.json')
  }

  addArticle(value: {}) {
     return this.http.post('https://techlead-e4ee9-default-rtdb.firebaseio.com/articles.json',value);
  }

  updateArticle(value: {},id: string) {
    return this.http.put('https://techlead-e4ee9-default-rtdb.firebaseio.com/articles/'+id+'.json',value);
  }

  deleteArticle(id: string) {
    return this.http.delete('https://techlead-e4ee9-default-rtdb.firebaseio.com/articles/'+id+'.json');
  } 

  getReviews() {
    return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews.json')
  }
  
}
