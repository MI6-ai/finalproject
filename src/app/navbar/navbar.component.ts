import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rightmenu = ['Shop', 'Subscribe', 'Profile'];
  // leftmenu = ['Home','Products','Guide','Publish','About','Contact']

  constructor() { }

  ngOnInit(): void {
  }

}
