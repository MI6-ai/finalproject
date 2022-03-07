import { Product } from "../products/product.model";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ProductDataService {

    productItem : Product|undefined;
    product : string ='';
    products =['laptops','mobiles','headphones'];
    laptops = [
        {
            name: 'Macbook Air1, laptop',
            rating: 9,
            price: 999,
            description: 'Definitely the best one',
            review: 'best',
            publisher: 'Abhishek Rathore',
            dateOfPublish: new Date('2022-01-27'),
            image: 'https://i.gadgets360cdn.com/large/apple_macbook_air_M1_2020review_cover_1607598067132.jpg?downsize=950:*'
        },
        {
            name: 'Macbook Air2, laptop',
            rating: 9,
            price: 999,
            description: 'Definitely the best one',
            review: 'best',
            publisher: 'Abhishek Rathore',
            dateOfPublish: new Date('2022-01-27'),
            image: 'https://i.gadgets360cdn.com/large/apple_macbook_air_M1_2020review_cover_1607598067132.jpg?downsize=950:*'
        },
        {
            name: 'Macbook Air3, laptop',
            rating: 9,
            price: 999,
            description: 'Definitely the best one',
            review: 'best',
            publisher: 'Abhishek Rathore',
            dateOfPublish: new Date('2022-01-27'),
            image: 'https://i.gadgets360cdn.com/large/apple_macbook_air_M1_2020review_cover_1607598067132.jpg?downsize=950:*'
        },
        {
            name: 'Macbook Air4, laptop',
            rating: 9,
            price: 999,
            description: 'Definitely the best one',
            review: 'best',
            publisher: 'Abhishek Rathore',
            dateOfPublish: new Date('2022-01-27'),
            image: 'https://i.gadgets360cdn.com/large/apple_macbook_air_M1_2020review_cover_1607598067132.jpg?downsize=950:*'
        }
    ];

    mobiles = [
        // {
        //     name: 'Iphone 13',
        //     rating: 9,
        //     price: 799
        // },
        // {
        //     name: 'Iphone 13 pro',
        //     rating: 9.5,
        //     price: 999
        // }
        {
            name: 'Macbook Air, mobiles',
            rating: 9,
            price: 999,
            description: 'Definitely the best one',
            review: 'best',
            publisher: 'Abhishek Rathore',
            dateOfPublish: new Date('2022-01-27'),
            image: 'https://i.gadgets360cdn.com/large/apple_macbook_air_M1_2020review_cover_1607598067132.jpg?downsize=950:*'
        }
    ];

    headphones = [
        // {
        //     name: 'Skullcandy hesh evo',
        //     rating: 8,
        //     price: 99
        // },
        // {
        //      name: 'Razer Blackshark',
        //      rating: 9,
        //      price: 109
        // }
        {
            name: 'Macbook Air, headphones',
            rating: 9,
            price: 999,
            description: 'Definitely the best one',
            review: 'best',
            publisher: 'Abhishek Rathore',
            dateOfPublish: new Date('2022-01-27'),
            image: 'https://i.gadgets360cdn.com/large/apple_macbook_air_M1_2020review_cover_1607598067132.jpg?downsize=950:*'
        }
    ];

    // gaming = [
    //     {
    //         name: ''
    //     }
    // ]

    getProducts()
    {
        switch(this.product) {
            case 'laptops': return this.laptops.slice();
            break;
            case 'mobiles': return this.mobiles.slice();
            break;
            case 'headphones': return this.headphones.slice();
            break;
        }
        return this.laptops.slice();
    }

    getProduct(index: number)
    {
        switch(this.product) {
            case 'laptops': return this.laptops[index-1];
            break;
            case 'mobiles': return this.mobiles[index-1];
            break;
            case 'headphones': return this.headphones[index-1];
            break;
        }
        return this.laptops[index-1];
    }
}