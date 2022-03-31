import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
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
  articlesChanged = new Subject<Article[]>();

  isAdding = false;

  ngOnInit(): void {
    this.articlesChanged.subscribe(
    (data: Article[]) => {
      this.articles = data;
    }
    )

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

  toggleAdd() {
    this.isAdding = !this.isAdding;
  }

  onAddArticle(form : NgForm) {

    this.adminService.addArticle(form.value).subscribe(
      (res) => {
        console.log(res);
        this.articles.push(form.value);
        this.articlesChanged.next(this.articles);
        form.reset();
        this.toggleAdd();
      }
    )
  }

  deleteArticle(id: string | undefined, index: number) {
    if(id) {
      this.adminService.deleteArticle(id).subscribe(
        (res) => {      
        console.log(res); 
        this.articles.splice(index, 1)
        this.articlesChanged.next(this.articles);
        })
    }
  }

}
