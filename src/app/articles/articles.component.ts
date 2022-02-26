import { Component, OnInit } from '@angular/core';
import { ArticleDataService } from '../services/article-data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articles: ArticleDataService) { }
  articals = this.articles.getArticals();

  ngOnInit(): void {
  }

}
