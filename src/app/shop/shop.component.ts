import { Component, OnInit } from '@angular/core';
import { ShopDataService } from '../services/shop-data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private shop: ShopDataService) { }

  products =this.shop.getProducts();

  firstSixProducts = this.products.slice(0,6);
  // i: number = 0;

  ngOnInit(): void {
  }

}
