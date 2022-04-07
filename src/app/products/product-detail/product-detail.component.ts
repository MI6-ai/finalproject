import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDataService } from 'src/app/services/product-data.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product = {
    name: '',
    rating: 0,
    price: 0,
    description:'',
    review: '',
    dateOfPublish: new Date(),
    image: '',
    publisher: '',
    category: ''
  };
  index: number = 0;
  productString: string ='';
  productName: string = '';
  Subscription = new Subscription;

  constructor(private productService: ProductDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.Subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.productString = params['product'];
          this.productService.product = this.productString;
          if(this.productService.products.includes(this.productString)){
            this.index = +params['id'];

            this.productService.getProducts()
            .pipe(map(resData => {
              const ProdArray: any = [];
              for (const key in resData) {
                if(resData.hasOwnProperty(key)) {          
                  ProdArray.push({...resData[key], id: key})
                }
              }
              return ProdArray;
            }))
            .subscribe(
              (resData) => {
                console.log(resData);
                this.product = resData[this.index-1];
              }
            )

          // this.product = this.productService.getProduct(this.index);
          }    
        }
      );
  }

  ngOnDestroy(): void {
      this.Subscription.unsubscribe();
  }
  
}
