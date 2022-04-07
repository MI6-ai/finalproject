import { Component, OnDestroy, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
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
  one = new Observable;
  two = new Observable;
  
  productName: string = '';
  productId: string ='';
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
                this.one = this.productService.getProductId(this.productName)
                this.one
                .pipe(map((res: any) => {
                  const ProdArray: any = [];
                  for (const key in res) {
                    if(res.hasOwnProperty(key)) {          
                      ProdArray.push({...res[key], id: key})
                    }
                  }
                  return ProdArray;
                }))
                .subscribe(
                  (res) => {
                    this.productId = res[3].results[0]._meta.id;
                    
                    this.two =  this.productService.getProductSpecs(this.productId);
                
                    this.two.pipe(this.productService.waitFor(this.one),map((resData: any) => {
                  
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
                    this.generalSpecs = resData[2];
                    console.log(this.generalSpecs);
                    this.displaySpecs = resData[3];
                    console.log(this.displaySpecs);
                    this.hardwareSpecs = resData[4];
                    console.log(this.hardwareSpecs);
                  })

                  })
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
