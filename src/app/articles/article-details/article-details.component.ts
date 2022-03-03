import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArticleDataService } from 'src/app/services/article-data.service';
import { Artical } from '../artical.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})

export class ArticleDetailComponent implements OnInit {
  artical: Artical = {
    name: '',
    dateOfPublish: new Date(),
    image: '',
    publisher: ''
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
          this.articalString = params['artical'];
          if(this.articleService.artical.includes(this.articalString)){
            this.index = +params['id'];
          this.artical = this.articleService.getArticals(this.index);
          }    
        }
      );

  }

}
