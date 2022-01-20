import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiServiceService {
  searchquery: string ='';

  constructor(private _http: HttpClient) { }

  dummyUrl: string = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=5cc0dece04c446ffb01528372f6cbf5e&q=";

  NewsApiUrl: string= "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=5cc0dece04c446ffb01528372f6cbf5e&q=";

  topHeading(): Observable<any> {
    return this._http.get(this.NewsApiUrl);
  }
}
