import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ArticleDataService } from '../services/article-data.service';
import { Article } from './article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticleDataService) { }
  articles: Article[] = [];

  ngOnInit(): void {

  this.articleService.getArticles()
  .pipe(map(resData => {
    const ArticleArray: any = [];
    for (const key in resData) {
      if(resData.hasOwnProperty(key)) {          
        ArticleArray.push({...resData[key], id: key})
      }
    }
    return ArticleArray;
  }))
  .subscribe(
    (resData) => {
      console.log(resData);
      this.articles = resData;
    }
  )
 }
}
