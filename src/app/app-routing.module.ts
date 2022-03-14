import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GuideComponent } from './guide/guide.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './services/auth.guard';
import { ProductSpecsComponent } from './products/product-detail/product-specs/product-specs.component';

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products', loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
  },
  {
    path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticleModule)
  },
  { path: 'guide', component: GuideComponent, canActivate: [AuthGuard]},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'shop', component: ShopComponent },
  { path: 'specs', component: ProductSpecsComponent},
  {
    path: 'news/:id' , component: AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
