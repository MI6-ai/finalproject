import { Product } from "../products/product.model";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { first ,switchMap } from "rxjs/operators"
@Injectable({
    providedIn: 'root'
  })
export class ProductDataService {

    constructor(private http: HttpClient) {}

    productItem : Product|undefined;
    product : string ='';
    products =['laptops','mobiles','headphones','gaming','wearables','entertainment'];
    productName : string ='';
     
    waitFor<T>(signal: Observable<any>) {
        return (source: Observable<T>) => signal.pipe(
            first(),
            switchMap(_ => source),
        );
    }

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


    getProductId(name: string) {
        return this.http.post(
            'https://apis.dashboard.techspecs.io/cs6vk2qrkhg626ia/api/product/search?query='+name,
            JSON.stringify({category: 'all'}),
            {headers: {
             Accept: 'application/json',
             'x-blobr-key': 'EAJIGl4C5ZQTkohu8DNlQoXCYCWGNP42',
             'Content-Type': 'application/json'
           }});

      
    }

    getProductSpecs(Id: string) {
        return this.http.get(
            'https://apis.dashboard.techspecs.io/cs6vk2qrkhg626ia/api/product/get/'+Id,
            {headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'x-blobr-key': 'EAJIGl4C5ZQTkohu8DNlQoXCYCWGNP42'
              }} 
        )
    }
}