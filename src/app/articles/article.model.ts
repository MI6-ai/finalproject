export class Article {
    public name : string;
    public description: string;
    public image: string;
    public essay: string;

    constructor(name: string,
      description: string,
          image: string,
          essay: string) 
     {

        this.name = name;
        this.description = description;
        this.image = image;
        this.essay = essay;

     }
}