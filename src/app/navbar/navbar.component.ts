
import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { NewsApiServiceService } from '../services/news-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewChecked {

  password: string | null= null;
  isView = true;
  isLoginMode = true;
  error:string = "";
  isLoading = false;
  isForget = false;
  reset: string ='';
  isAdmin = false;
  isAdminConfirmed = false;
  adminEmails : string[] = [];


  private userSub: Subscription | undefined;
  isAuthenticated = false;

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSwitchForget() {
    this.isForget = !this.isForget;
  }

  onSwitchAdmin() {
    this.isAdmin = !this.isAdmin;
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
    // const scrollDown: any = document.querySelector(".scroll-down");
    // let isOpened = false;

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

  SearchF(form: NgForm) {
    this.searchQuery = form.value.searchBar;
    this.NewsApiService.searchquery = this.searchQuery;
    form.reset();
  }

  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
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
    setTimeout(() => this.error="",3500)

  }

 onAdminLogin(form: NgForm) {
  this.isLoading = true;
  
  const email = form.value.email;
  const password = form.value.password;

  this.authService.admin()
      .pipe(map(resData => {
        const adminArray = [];
        for (const key in resData) {
          if(resData.hasOwnProperty(key)) {          
            adminArray.push({...resData[key], id: key})
          }
        }
        return adminArray;
      }))
      .subscribe(
        (result) => {
          for (let res in result) {
            this.adminEmails.push(result[res].email);
          }
          console.log(this.adminEmails);
          if(this.adminEmails.includes(email)){
            this.authService.isAdmin = true;
          } 

          this.authService.login(email,password).subscribe({
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
          this.adminEmails = [];
        },   
      )
      form.reset();
 }

  onLogout() {
    this.modalButton.addEventListener("click", () => {
      this.modal.classList.add("is-open");
      this.body.style.overflow = "hidden";
    });
    this.authService.logout();
    this.authService.isAdmin = false;
    this.isAdminConfirmed = false;
  }

  forgetPassword(loginform: NgForm) {
    const email = loginform.value.email;
    
    let ForgetObs = this.authService.forget(email);
    ForgetObs.subscribe({
        next: (resData: any) => {
          this.isForget = false;
          this.reset = 'Password reset link sent!'
        },
      error: (eMsg) => {
        console.log(eMsg);
        this.isForget = false;
        this.error = eMsg;
      }
    });
    
    setTimeout(() => this.error="",3500)
  }

  ngAfterViewChecked(): void {
      console.log(this.authService.user.value.isAdmin);
    this.isAdminConfirmed = this.authService.user.value.isAdmin;
  }

  ngOnDestroy(): void {
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }
}
