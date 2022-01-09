import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { GuideComponent } from './guide/guide.component';
import { PublishComponent } from './publish/publish.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { NewsApiServiceService } from './services/news-api-service.service';
import { ProductListComponent } from './products/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    GuideComponent,
    PublishComponent,
    AboutComponent,
    ContactComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NewsApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
