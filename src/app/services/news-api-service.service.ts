import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiServiceService {
  searchquery: string ='iphone';

  constructor(private _http: HttpClient) { }

  NewsApiUrl = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=5cc0dece04c446ffb01528372f6cbf5e";

  SearchUrl = "https://newsapi.org/v2/top-headlines?country=in&q=iphone&category=technology&apiKey=5cc0dece04c446ffb01528372f6cbf5e";

  topHeading(): Observable<any> {
    return this._http.get(this.SearchUrl);
  }
}
