import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registred?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ8XB6dnU7uaezMQfVhcvI6XjRQfAlL1s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      } 
      )
  }

  login(email:string,password:string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ8XB6dnU7uaezMQfVhcvI6XjRQfAlL1s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      } 
      )
  }
}
