export class Product {
    public name : string;
    public rating: number;
    public price: number

    constructor(name: string, rating: number, price: number) {
        this.name = name;
        this.rating = rating;
        this.price = price
    }
}