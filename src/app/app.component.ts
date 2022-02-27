import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'finalproject';

  constructor( private Route: ActivatedRoute, private authService: AuthService) {}

  activeUrl =""
 
  ngOnInit(): void {
    this.authService.autoLogin();
  }
   
}
