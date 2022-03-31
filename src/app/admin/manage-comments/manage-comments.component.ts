import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Comment } from './comment.model';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css']
})
export class ManageCommentsComponent implements OnInit, OnDestroy {

  constructor(private adminService: AdminService, private http: HttpClient) { }

  commentsChanged = new Subject<Comment[]>();
  subscription = new Subscription; 
  comments: Comment[] = [];

  ngOnInit(): void {
    
    this.adminService.getComments()
    .pipe(map((resData: any) => {
      const CommentsArray: any = [];
      for (const key in resData) {
        if(resData.hasOwnProperty(key)) {          
          CommentsArray.push({...resData[key], id: key})
         }
      }
      return CommentsArray;
    }))
    .subscribe(
      (resData) => {
        this.subscription = this.commentsChanged.subscribe(
          (comments: Comment[]) => {
            this.comments = comments;
          }
        )
        console.log(resData);
        this.comments = resData;
      }
    )

  }

  
  deleteComment(id: string, index: number) {
    
    this.adminService.deleteComments(id).subscribe(
      (res) => {      
      console.log(res); 
      this.comments.splice(index, 1)
      this.commentsChanged.next(this.comments);
      })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
