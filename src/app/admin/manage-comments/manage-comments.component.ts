import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin.service';
import { Comment } from './comment.model';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.css']
})
export class ManageCommentsComponent implements OnInit {

  constructor(private adminService: AdminService, private http: HttpClient) { }

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
        console.log(resData);
        this.comments = resData;
      }
    )

  }
  deleteComment(id: string) {
    
    this.adminService.getComment(id).subscribe(
      (data) => {
        console.log(data);
        this.adminService.deleteComments(id).subscribe(
          (res) => {      
          console.log(res); 
          this.comments = this.comments.filter(item => item!=data); 
          }
        )
      }
    ) 
    
  }

}
