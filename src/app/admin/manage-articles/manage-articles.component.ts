import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/articles/article.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.css']
})
export class ManageArticlesComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  articles: Article[] = [];

  ngOnInit(): void {

    this.adminService.getArticles()
    .pipe(map((resData: any) => {
      const ArticlesArray: any = [];
      for (const key in resData) {
        if(resData.hasOwnProperty(key)) {          
          ArticlesArray.push({...resData[key], id: key})
         }
      }
      return ArticlesArray;
    }))
    .subscribe(
      (resData) => {
        console.log(resData);
        this.articles = resData;
      }
    )
  }

}
