import { Component, OnInit } from '@angular/core';
import { ArticleDataService } from '../services/article-data.service';
import { Article } from './article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticleDataService) { }
  articles: Article[] = this.articleService.getArticles();

  ngOnInit(): void {
  }

}
