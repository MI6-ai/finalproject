export class ProductDataService {
    product : string ='';
    
    laptops = [
        {
            name: 'Macbook Air',
            rating: 9,
            price: 999
        },
        {
            name: 'DELL XPS 17',
            rating: 9,
            price: 1999
        }
    ];

    mobiles = [
        {
            name: 'Iphone 13',
            rating: 9,
            price: 799
        },
        {
            name: 'Iphone 13 pro',
            rating: 9.5,
            price: 999
        }
    ];

    getProducts()
    {
        switch(this.product) {
            case 'laptops': return this.laptops.slice();
            break;
            case 'mobiles': return this.mobiles.slice();
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
        }
        return this.laptops[index];
    }
}