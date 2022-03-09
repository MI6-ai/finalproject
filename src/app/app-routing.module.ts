import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GuideComponent } from './guide/guide.component';
import { ArticlesComponent } from './articles/articles.component'
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ArticleDetailComponent } from './articles/article-details/article-details.component';

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'products', loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
  },
  {
    path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticleModule)
  },
  { path: 'guide', component: GuideComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'shop', component: ShopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
