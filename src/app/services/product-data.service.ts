import { Product } from "../products/product.model";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class ProductDataService {

    constructor(private http: HttpClient) {}

    productItem : Product|undefined;
    product : string ='';
    products =['laptops','mobiles','headphones','gaming','wearables','entertainment'];
     

    getProducts() : Observable<any>
    {      
        switch(this.product) {
            
            case 'laptops': return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews/laptops.json');
            break;
            case 'mobiles': return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews/mobiles.json');
            break;
            case 'headphones': return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews/headphones.json');
            break;
            case 'gaming': return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews/gaming.json');
            break;
            case 'wearables': return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews/wearables.json');
            break;
            case 'entertainment': return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews/entertainment.json');
            break;
        }
        return this.http.get('https://techlead-e4ee9-default-rtdb.firebaseio.com/reviews.json')
    }

    // getProduct(index: number)
    // {

    //     switch(this.product) {
    //         case 'laptops': return this.laptops[index-1];
    //         break;
    //         case 'mobiles': return this.mobiles[index-1];
    //         break;
    //         case 'headphones': return this.headphones[index-1];
    //         break;
    //     }
    //     return this.laptops[index-1];
    // }
}