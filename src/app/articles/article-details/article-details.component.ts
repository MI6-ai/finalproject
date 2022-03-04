import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleDataService } from 'src/app/services/article-data.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})

export class ArticleDetailComponent implements OnInit {
  article: Article = {
    name: 'Dell Inspiron',
    image: '',
    
  };
  index: number = 0;
  articalString: string ='';

  constructor(private articleService: ArticleDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {

            this.index = +params['id'];
          this.article = this.articleService.getArticle(this.index);
           
        }
     );

  }

}
