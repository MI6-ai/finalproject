import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { AdminComponent } from "./admin.component";
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { ManageArticlesComponent } from './manage-articles/manage-articles.component';

@NgModule({
    declarations: [
        AdminComponent,
        ManageCommentsComponent,
        ManageArticlesComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, canActivate: [AuthGuard], children: [
                   { path: 'comments/manage', component: ManageCommentsComponent },
                   { path: 'articles/manage', component: ManageArticlesComponent}
                ]
            }
        ])
    ],
    exports: [

    ]
})
export class AdminModule {

}