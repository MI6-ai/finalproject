import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductDataService } from 'src/app/services/product-data.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    name: '',
    rating: 0,
    price: 0
  };
  index: number = 0;

  constructor(private productService: ProductDataService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.index = +params['id'];
          this.product = this.productService.getProduct(this.index);
        }
      );

  }

}
