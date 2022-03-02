import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopDataService {

  constructor() { }

  product= [
    {
      name: "Black T-Shirt1",
      price: "200",
      description: "Black cotton t-shirt",
      image: "assets/img/img2.png"
    },
    {
      name: "Black T-Shirt2",
      price: "200",
      description: "Black cotton t-shirt",
      image: "https://cdn.shopify.com/s/files/1/0328/4801/9595/products/mockup-4ad0c44a_1024x1024@2x.jpg?v=1602173083"
    },
    {
      name: "Black T-Shirt3",
      price: "200",
      description: "Black cotton t-shirt",
      image: "assets/img/img2.png"
    },
    {
      name: "Black T-Shirt4",
      price: "200",
      description: "Black cotton t-shirt",
      image: "assets/img/img2.png"
    },
    {
      name: "Black T-Shirt5",
      price: "200",
      description: "Black cotton t-shirt",
      image: "https://cdn.shopify.com/s/files/1/0328/4801/9595/products/mockup-4ad0c44a_1024x1024@2x.jpg?v=1602173083"
    },
    {
      name: "Black T-Shirt6",
      price: "200",
      description: "Black cotton t-shirt",
      image: "https://cdn.shopify.com/s/files/1/0328/4801/9595/products/mockup-4ad0c44a_1024x1024@2x.jpg?v=1602173083"
    }
  ];

  getProducts() {
    return this.product.slice();
  }
}
