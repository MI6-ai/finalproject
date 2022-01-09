export class ProductDataService {
    
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

    getProducts()
    {
        return this.laptops.slice();
    }
}