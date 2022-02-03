export class Product {
    public name : string;
    public description: string;
    public rating: number;
    public review: string;
    public publisher: string;
    public dateOfPublish: Date;
    public image: string;
    public price: number;

    constructor(name: string,
          rating: number,
          price: number,
          description: string,
          review: string,
          publisher: string,
          dateOfPublish: Date,
          image: string) 
     {

        this.name = name;
        this.rating = rating;
        this.price = price;
        this.description = description;
        this.review = review;
        this.publisher = publisher;
        this.dateOfPublish = dateOfPublish;
        this.image = image

     }
}