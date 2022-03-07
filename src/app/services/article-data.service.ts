import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleDataService {

  constructor() { }
  articles= [
    {
      name: "Dell Inspiron",
      description: "Let's Talk about...",
      image: "assets/img/laptop.jpg",
      essay: "sample1"
    },
    {
      name: "Steam Deck",
      description: "New face of gaming...",
      image: "assets/img/steam.jpg",
      essay: "sample2"
    },
    {
      name: "Wild Gaming!",
      description: "In your wildest...",
      image: "assets/img/razer.jpg",
      essay: "sample3"
    },
    {
      name: "Wild Gaming2!",
      description: "In your wildest...",
      image: "assets/img/razer.jpg",
      essay: "sample3"
    }
  ];

  getArticles() {
    return this.articles.slice();
  }

  getArticle(index: number) {
    return this.articles[index-1];
  }
}

