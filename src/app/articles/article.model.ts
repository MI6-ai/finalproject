export class Article {
    public name : string;
    public publisher: string;
    public description: string;
    public image: string;
    public essay: string;
    public id?: string;

    constructor(name: string,
      publisher: string,
      description: string,
          image: string,
          essay: string) 
     {

        this.name = name;
        this.publisher = publisher;
        this.description = description;
        this.image = image;
        this.essay = essay;

     }
}