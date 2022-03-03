export class Artical {
    public name : string;
    public publisher: string;
    public dateOfPublish: Date;
    public image: string;

    constructor(name: string,
          publisher: string,
          dateOfPublish: Date,
          image: string) 
     {

        this.name = name;
        this.publisher = publisher;
        this.dateOfPublish = dateOfPublish;
        this.image = image;

     }
}