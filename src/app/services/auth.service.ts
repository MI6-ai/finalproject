import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
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
  private tokenExpTimer: any;
  isAdmin = false;

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

  forget(email: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCZ8XB6dnU7uaezMQfVhcvI6XjRQfAlL1s',
      {
        email: email,
        requestType: 'PASSWORD_RESET'
      }
    ).pipe(catchError(this.handleError))
  }


  admin(): Observable<any> {
    return this.http.get(
      'https://techlead-e4ee9-default-rtdb.firebaseio.com/Admins.json'
    )
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userdata');
    if(this.tokenExpTimer)
    {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogin() {
    const userData: any = JSON.parse(localStorage.getItem('userdata')!);
    console.log(userData)
    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate), userData.isAdmin);
    if(loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout((new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()));
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpTimer= setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate, this.isAdmin);
    this.user.next(user);

    console.log(this.user.value);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userdata', JSON.stringify(user));
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
