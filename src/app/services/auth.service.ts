import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      ).pipe(catchError(this.handleError))
  };

  login(email:string,password:string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ8XB6dnU7uaezMQfVhcvI6XjRQfAlL1s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      } 
      ).pipe(catchError(this.handleError))
  };

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occured';
        if(errorRes.error.error || errorRes.error)
        {
          switch(errorRes.error.error.message) 
          {
            case 'INVALID_PASSWORD':
              errorMsg = 'Invalid password, please try again.';
              break;
            case 'EMAIL_EXISTS':
              errorMsg = 'The Email already exixts.';
              break;
          }
        }
        return throwError(() => errorMsg);
  }

}
