import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-specs',
  templateUrl: './product-specs.component.html',
  styleUrls: ['./product-specs.component.css']
})
export class ProductSpecsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductDataService, private route: ActivatedRoute) { }

  Subscription = new Subscription;
  productString: string ='';
  index: number = 0;
  
  productName: string = '';
  productId: string |undefined;
  productImage: string | undefined;

  generalSpecs: any;
  hardwareSpecs : any;
  displaySpecs: any;
  
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
                this.productName = resData[this.index-1].name;
                this.productImage = resData[this.index-1].image;
                this.productId = this.productService.getProductId(this.productName);

                this.productService.getProductSpecs(this.productId)
                .pipe(map((resData: any) => {
                   const ProdArray: any = [];
                   let specsArray: any;
                   const abcd: any = [];
                  for (const key in resData.data) {
                    if(resData.data.hasOwnProperty(key)) {          
                      ProdArray.push({...resData.data[key][0]})
                    }
                  }
                  specsArray = ProdArray[0];
                  for (const key in specsArray) {
                    if(specsArray.hasOwnProperty(key)) {          
                      abcd.push({...specsArray[key]})
                    }
                  }
                  
                  return abcd;
                }))
                .subscribe(
                  (resData) => {
                    console.log(resData);
                    this.generalSpecs = resData[1];
                    
                    this.displaySpecs = resData[2];
                    
                    this.hardwareSpecs = resData[3];
                   
                  }
                )

              }
            )
          }    
        }
      );
  }

  ngOnDestroy(): void {
      this.Subscription.unsubscribe();
  }
}
