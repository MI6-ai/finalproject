import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticleDataService } from 'src/app/services/article-data.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})

export class ArticleDetailComponent implements OnInit {

  article: Article | undefined;
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
                 this.article = resData[this.index-1];
                }
              )       
        });
  }
}
