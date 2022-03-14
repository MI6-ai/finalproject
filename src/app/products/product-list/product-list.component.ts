import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDataService } from 'src/app/services/product-data.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  // product : string ='';
  products : Product[] = [];

  isSearched = false;
  searchedProducts: Product[] = [];
  searchProduct: string = '';
  Subscription = new Subscription;

  constructor(private route : ActivatedRoute,
    private ProductDataService: ProductDataService) { }

  ngOnInit(): void {
    this.Subscription= this.route.params.subscribe(
    (params: Params) => {
      this.ProductDataService.product = params['product'];
      this.ProductDataService.getProducts()
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
          this.products = resData;
        }
      )

    // this.products = this.ProductDataService.getProducts();
    }
    );
  }

  SearchProducts(form: any) {
    this.searchedProducts = [];
    this.isSearched = true;
    this.searchProduct = form.searchproduct;
    // console.log(this.searchProduct);
    for(let prod of this.products)
    {
      if(prod.name.toLowerCase().includes(this.searchProduct.toLowerCase()))
      {
        this.searchedProducts.push(prod);
      }
    }
  }

  ngOnDestroy(): void {
      this.Subscription.unsubscribe();
  }

}
