import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'finalproject';

  constructor( private Route: ActivatedRoute) {
  }
  activeUrl =""

  
  ngOnInit(): void {
  }
  
  
}
