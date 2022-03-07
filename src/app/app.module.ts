import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { GuideComponent } from './guide/guide.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { NewsApiServiceService } from './services/news-api-service.service';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDataService } from './services/product-data.service';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { ArticleDetailComponent } from './articles/article-details/article-details.component';
import { ProductEmptyComponent } from './products/product-empty/product-empty.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    GuideComponent,
    AboutComponent,
    ContactComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductItemComponent,
    FooterComponent,
    ShopComponent,
    ArticlesComponent,
    LoadingSpinnerComponent,
    ArticleDetailComponent,
    ProductEmptyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [NewsApiServiceService, ProductDataService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
