import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../services/auth.guard";
import { AdminComponent } from "./admin.component";
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';

@NgModule({
    declarations: [
        AdminComponent,
        ManageCommentsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, canActivate: [AuthGuard], children: [
                   { path: 'comments/manage', component: ManageCommentsComponent }
                ]
            }
        ])
    ],
    exports: [

    ]
})
export class AdminModule {

}