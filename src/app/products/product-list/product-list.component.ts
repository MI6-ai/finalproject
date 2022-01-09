import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product : string ='';

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
    (params: Params) => {
      this.product = params['product'];
    }
    )
  }

}
