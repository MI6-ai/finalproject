import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NewsApiServiceService } from "../services/news-api-service.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private service: NewsApiServiceService) { }

  topHeadingDisplay: any = [];

  ngOnInit(): void {
    this.service.topHeading()
     .subscribe(
       (result) => {
         console.log(result);
         this.topHeadingDisplay = result.articles;
       }
     )
  }

  


}
