import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GuideComponent } from './guide/guide.component';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { PublishComponent } from './publish/publish.component';

const appRoutes : Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'guide', component: GuideComponent},
  { path: 'publish', component: PublishComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
