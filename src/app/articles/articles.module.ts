import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ArticleDetailComponent } from "./article-details/article-details.component";
import { ArticlesComponent } from "./articles.component";

@NgModule({
    declarations: [
        ArticlesComponent,
        ArticleDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: ArticlesComponent },
            { path: ':id', component: ArticleDetailComponent }
        ])
    ],
    exports: [
        ArticlesComponent,
        ArticleDetailComponent
    ]
})
export class ArticleModule {}