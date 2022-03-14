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
}
