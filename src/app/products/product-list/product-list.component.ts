import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // product : string ='';
  products : Product[] = [];

  isSearched = false;
  searchedProducts: Product[] = [];
  searchProduct: string = '';

  constructor(private route : ActivatedRoute,
    private ProductDataService: ProductDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
    (params: Params) => {
      this.ProductDataService.product = params['product'];
      // console.log(this.ProductDataService.product);
    this.products = this.ProductDataService.getProducts();
    }
    );
  }

  SearchProducts(form: any) {
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
    // console.log(this.searchedProducts)
  }

}
