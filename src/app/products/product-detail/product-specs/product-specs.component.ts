import { Component, Input, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-specs',
  templateUrl: './product-specs.component.html',
  styleUrls: ['./product-specs.component.css']
})
export class ProductSpecsComponent implements OnInit {

  constructor(private productService: ProductDataService) { }
  
  @Input() productName: string |undefined;
  
  ngOnInit(): void {

    // this.productService.getProductID().subscribe(
    //   (resData) => {
    //     console.log(resData);
    //   }
    // )

  }

}
