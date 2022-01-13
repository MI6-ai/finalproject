import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { NewsApiServiceService } from '../services/news-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // rightmenu = ['Shop', 'Subscribe', 'Profile'];
  // leftmenu = ['Home','Products','Guide','Publish','About','Contact']
  searchQuery: string ='';

  constructor(private NewsApiService : NewsApiServiceService,
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  SearchF(form: any) {
    this.searchQuery = form.searchBar;
    this.NewsApiService.searchquery = this.searchQuery;
  }
  updateHome(){
    this.router.navigate(['/'], {relativeTo: this.route});
  }
}
