import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { User } from '../shared/user.model';

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

  user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ8XB6dnU7uaezMQfVhcvI6XjRQfAlL1s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      } 
      ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      }))
  };

  login(email:string,password:string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ8XB6dnU7uaezMQfVhcvI6XjRQfAlL1s',
      {
        email: email,
        password: password,
        returnSecureToken: true
      } 
      ).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      }))
  };

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

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
            case 'EMAIL_NOT_FOUND':
              errorMsg = 'Email does not exist.';
              break;
            case 'USER_DISABLED':
              errorMsg = 'This account has been disabled for security reasons.'
              break;
          }
        }
        return throwError(() => errorMsg);
  }

}
