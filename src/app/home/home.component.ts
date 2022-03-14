import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsApiServiceService } from "../services/news-api-service.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  constructor(private service: NewsApiServiceService, private route: ActivatedRoute) { }
  newsSubscription: Subscription = new Subscription();

  topHeadingDisplay: any = [];

  ngOnInit(): void {
    this.newsSubscription = this.route.queryParams
    .subscribe(
      (result) => {
        if(result['search'])
        {
          this.service.NewsApiUrl = this.service.dummyUrl.concat(result['search']);
          console.log(this.service.NewsApiUrl)
        }
        else
        {
          this.service.NewsApiUrl = 'https://free-news.p.rapidapi.com/v1/search?lang=en&q=any';
        }
    this.service.topHeading()
     .subscribe(
       (result) => {
         console.log(result);
         this.topHeadingDisplay = result.articles;
         console.log(this.topHeadingDisplay);
         this.service.NewsApiUrl = this.service.dummyUrl;
       } )
      }
    );
  }

  ngOnDestroy(): void {
    this.service.NewsApiUrl = 'https://free-news.p.rapidapi.com/v1/search?lang=en&q=any';
      this.newsSubscription.unsubscribe();
  }
}
