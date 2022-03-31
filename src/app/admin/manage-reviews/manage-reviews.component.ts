import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/products/product.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  reviews: Product[] = [];

  ngOnInit(): void {

    this.adminService.getReviews()
    .pipe(map((resData: any) => {
      const ReviewsCatArray: any = [];
      const ReviewsArray: any = [];
      const RArray: any = [];
      for (const key in resData) {
        if(resData.hasOwnProperty(key)) {          
          ReviewsCatArray.push({...resData[key]})
         }
      }
      for (const key in ReviewsCatArray) {
        ReviewsArray.push({...ReviewsCatArray[key]})
      }
      for(let i=0; i<ReviewsArray.length; i++) {
        for( const key in ReviewsArray[i]) {
          RArray.push({...ReviewsArray[i][key]})
        }
      }
     
      return RArray;
    }))
    .subscribe(
      (res) => {
        console.log(res);
        this.reviews = res;
      }
    )
  }

}
