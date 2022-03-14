import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiServiceService {
  searchquery: string ='';

  constructor(private _http: HttpClient) { }

  // dummyUrl: string = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=5cc0dece04c446ffb01528372f6cbf5e&q=";

  // NewsApiUrl: string= "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=5cc0dece04c446ffb01528372f6cbf5e&q=";

  dummyUrl: string = 'https://free-news.p.rapidapi.com/v1/search?lang=en&q=';
  NewsApiUrl : string = 'https://free-news.p.rapidapi.com/v1/search?lang=en&q=any';

  topHeading(): Observable<any> {
    // return this._http.get(this.NewsApiUrl);
    return this._http.get(this.NewsApiUrl, {headers: {'x-rapidapi-host': 'free-news.p.rapidapi.com', 'x-rapidapi-key': '9eb0e02564msh04388dd93715b1ap175d4ajsndc1652b5d03d'}});
  }
}
