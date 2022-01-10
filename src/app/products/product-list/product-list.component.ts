import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // product : string ='';
  products : {
    name: string,
    rating: number,
    price: number
  }[] = []

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

}
