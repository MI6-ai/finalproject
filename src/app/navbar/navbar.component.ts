import { ConstantPool } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { NewsApiServiceService } from '../services/news-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  error:string = "";
  isLoading = false;

  private userSub: Subscription | undefined;
  isAuthenticated = false;

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
  
  searchQuery: string ='';

  constructor(private NewsApiService : NewsApiServiceService,
    private router : Router,
    private route: ActivatedRoute,
    private authService: AuthService) 
  { }

    

  ngOnInit(): void {

    const body: any = document.querySelector("body");
    const modal: any = document.querySelector(".modal");
    const modalButton: any = document.querySelector(".modal-button");
    const closeButton: any = document.querySelector(".close-button");
    const scrollDown: any = document.querySelector(".scroll-down");
    let isOpened = false;

    const openModal = () => {
     modal.classList.add("is-open");
     body.style.overflow = "hidden";
    };

    const closeModal = () => {
     modal.classList.remove("is-open");
     body.style.overflow = "initial";
    };

    window.addEventListener("scroll", () => {
     if (window.scrollY > window.innerHeight / 3 && !isOpened) {
       isOpened = true;
       scrollDown.style.display = "none";
       openModal();
      }
    });

    modalButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);

    

    document.onkeydown = evt => {
     evt = evt || window.event;
     evt.keyCode === 27 ? closeModal() : false;
    };
    

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated)
      {
        modalButton.removeEventListener("click",openModal);
      }
    })
    
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

    const email = loginform.value.email;
    const password = loginform.value.password;
    let confirmPassword = null;
    if(loginform.value.confpassword)
    {
     confirmPassword = loginform.value.confpassword;
     if(password!=confirmPassword)
     {
       this.error = "Please enter correct details"; 
       this.isLoading = false;
       loginform.reset();
       setTimeout(() => this.error="",3000)
       return;
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
        
        const body: any = document.querySelector("body");
        const modal: any = document.querySelector(".modal");
        modal.classList.remove("is-open");
        body.style.overflow = "initial";

        this.router.navigate(['/'])
      },
      error: (eMsg) => {
        console.log(eMsg);
        this.error = eMsg;
        this.isLoading= false;
      }
    })

    loginform.reset();
    setTimeout(() => this.error="",5000)

  }

  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
