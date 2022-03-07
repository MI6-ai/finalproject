import { ConstantPool } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Observable, Subscription, throwError } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { NewsApiServiceService } from '../services/news-api-service.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  password: string | null= null;
  isView = true;
  isLoginMode = true;
  error:string = "";
  isLoading = false;

  private userSub: Subscription | undefined;
  isAuthenticated = false;

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  nullPassword() {
    this.isView = false;
  }
  
  searchQuery: string ='';

  constructor(private NewsApiService : NewsApiServiceService,
    private router : Router,
    private route: ActivatedRoute,
    private authService: AuthService
    )  { }

  modalButton: any = null;
  body: any = null;
  modal: any = null;

  ngOnInit(): void {

    this.body = document.querySelector("body");
    this.modal = document.querySelector(".modal");
    this.modalButton = document.querySelector(".modal-button");
    const closeButton: any = document.querySelector(".close-button");
    const scrollDown: any = document.querySelector(".scroll-down");
    let isOpened = false;

    const openModal = () => {
     this.modal.classList.add("is-open");
     this.body.style.overflow = "hidden";
    };

    const closeModal = () => {
     this.modal.classList.remove("is-open");
     this.body.style.overflow = "initial";
    };

    this.modalButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);


    document.onkeydown = evt => {
     evt = evt || window.event;
     evt.keyCode === 27 ? closeModal() : false;
    };
    

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if(this.isAuthenticated)
      {
        this.modalButton.removeEventListener("click",openModal);
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

  onLogout() {
    this.modalButton.addEventListener("click", () => {
      this.modal.classList.add("is-open");
      this.body.style.overflow = "hidden";
    });
    this.authService.logout();
  }

  forgetPassword(loginform: NgForm) {
    const email = loginform.value.email;
    this.authService.forget(email).subscribe(
      {
        next: (resData) => {
          console.log(resData);
        }
      }
    )
  }

  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
