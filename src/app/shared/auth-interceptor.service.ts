import { HttpHandler, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { NewsApiServiceService } from "../services/news-api-service.service";

@Injectable()
export class AuthInterceptorService {

    constructor(private authService: AuthService, private newsApi: NewsApiServiceService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

     return this.authService.user.pipe(
             take(1),
             exhaustMap(user => {
                 if(!user) {
                    return next.handle(req);
                 }
                 if(req.url!= this.newsApi.NewsApiUrl) {
                    const modifiedreq = req.clone({params: new HttpParams().set('auth', user.token)})
                    return next.handle(modifiedreq);
                 }
                 return next.handle(req);
             })
        )
    }

}