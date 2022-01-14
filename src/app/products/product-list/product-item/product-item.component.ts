import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = {
    name: '',
    rating: 0,
    price: 0
  };
  @Input() index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
