import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GuideComponent } from './guide/guide.component';
import { ArticlesComponent } from './articles/articles.component'
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop/shop.component';

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent, children: [
    { path: ':product', component: ProductListComponent, children: [
      { path: '', component: AboutComponent},
    ]},
    { path: ':product/:id', component: ProductDetailComponent }
  ]},
  { path: 'guide', component: GuideComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'shop', component: ShopComponent },
  { path: 'articles', component: ArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
