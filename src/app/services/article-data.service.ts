import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  constructor() { }
  articles= [
    {
      name: "Laptop1",
      description: "Let's Talk about...",
      image: "assets/img/laptop.jpg"
    },
    {
      name: "Steam Deck",
      description: "New face of gaming...",
      image: "assets/img/steam.jpg"
    },
    {
      name: "Wild Gaming!",
      description: "In your wildest...",
      image: "assets/img/razer.jpg"
    }
  ];

  getArticals() {
    return this.articles.slice();
  }

  getArticle(index: number) {
    return this.articles[index-1];
  }
}

