import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { NewsApiServiceService } from '../services/news-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoginMode = true;
  error:string = "";
  isLoading = false;

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  searchQuery: string ='';

  constructor(private NewsApiService : NewsApiServiceService,
    private router : Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    
  }
  SearchF(form: any) {
    this.searchQuery = form.searchBar;
    this.NewsApiService.searchquery = this.searchQuery;
  }

  updateHome(){
    this.router.navigate(['/'], {relativeTo: this.route});
  }

  onLogin(loginform: NgForm) {
    this.isLoading = true;
    const email = loginform.value.uname;
    const password = loginform.value.psw;
    let confirmPassword = null;
    if(loginform.value.confpsw)
    {
     confirmPassword = loginform.value.confpsw;
     if(password!=confirmPassword)
     {
       this.error = "Please enter correct details";
     }
    }

    let AuthObs: Observable<AuthResponseData>

    if(this.isLoginMode)
    {
      AuthObs = this.authService.login(email,password);
    }
    else
    {
      AuthObs = this.authService.signup(email,password);
    }
    console.log("hi");
    AuthObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e)
      }
    })

    loginform.reset();
    setTimeout(() => this.error="",5000)

  }
}
