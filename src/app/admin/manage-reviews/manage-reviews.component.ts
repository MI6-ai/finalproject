import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/products/product.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.scss']
})
export class ManageReviewsComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  reviews: Product[] = [];
  reviewsChanged = new Subject<Product[]>();
  categories = ['laptops','mobiles','entertainment','gaming','headphones','wearables'];

  isAdding = false;
  isUpdating = '';

  toggleAdd() {
    this.isAdding = !this.isAdding;
  }

  toggleUpdate(key: string |undefined) {
    if(key) {
      this.isUpdating = key;
    }
  }

  onAddReview(form: NgForm) {
    this.adminService.addReview(form.value,form.value.category).subscribe(
      (res) => {
        this.reviews.push(form.value);
        this.reviewsChanged.next(this.reviews);
        form.reset();
        this.toggleAdd();
      }
    )
  }

  onUpdateReview(form: NgForm,id: string, i: number, category: string) {
    if(id) {
      this.adminService.updateReview(form.value, id, category).subscribe(
        (resData) => {
          this.reviews[i] = form.value;
          this.reviewsChanged.next(this.reviews);
          form.reset();
          this.isUpdating = '';
        }
      )
    }
  }

  onDeleteReview(id: string | undefined, index: number, category: string) {
    if(id)
    {
      this.adminService.deleteReview(id, category).subscribe(
        (res) => {
          this.reviews.splice(index,1);
          this.reviewsChanged.next(this.reviews);
        }
      )
    }
  }

  ngOnInit(): void {

    this.reviewsChanged.subscribe(
      (data: Product[]) => {
        this.reviews = data;
      }
    )

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
          RArray.push({...ReviewsArray[i][key], key})
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
