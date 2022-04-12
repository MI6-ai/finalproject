import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from 'src/app/articles/article.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-articles',
  templateUrl: './manage-articles.component.html',
  styleUrls: ['./manage-articles.component.scss']
})
export class ManageArticlesComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  articles: Article[] = [];
  articlesChanged = new Subject<Article[]>();

  isAdding = false;
  isUpdating = '';

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

  toggleUpdate(id: string | undefined) {
    if(id)
    {
      this.isUpdating = id;
    }   
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

  onUpdateArticle(form: NgForm, id: string, i: number) {
    if(id) 
    {
      this.adminService.updateArticle(form.value, id).subscribe(
        (res) => {
          console.log(res);
          this.articles[i] = form.value;
          this.articlesChanged.next(this.articles);
          form.reset();
          this.isUpdating = '';
          
        }
      )
    }

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
