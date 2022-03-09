import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductEmptyComponent } from "./product-empty/product-empty.component";
import { ProductItemComponent } from "./product-list/product-item/product-item.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductsComponent } from './products.component';

@NgModule({
    declarations: [
        ProductsComponent,
        ProductListComponent,
        ProductDetailComponent,
        ProductItemComponent,
        ProductEmptyComponent
    ],
    imports: [
        RouterModule.forChild([
         { path: '', component: ProductsComponent, children: [
            {path: '', redirectTo: 'list', pathMatch:'full'},
            { path: 'list', component: ProductEmptyComponent},
            { path: ':product', component: ProductListComponent },
            { path: ':product/:id', component: ProductDetailComponent }
         ]}
        ]),
        CommonModule,
        FormsModule
    ],
    exports: [
        ProductsComponent,
        ProductListComponent,
        ProductDetailComponent,
        ProductItemComponent,
        ProductEmptyComponent
    ]
})
export class ProductModule {}