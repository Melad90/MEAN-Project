import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { StartPageComponent } from "./startPage/startpage.component";
import { NewsPageComponent } from "./NewsPage/news-page.component";
import { OmOssComponent } from "./OmOss/om-oss.component";
import { KontaktOssComponent } from "./KontaktOss/kontakt-oss.component";
import { LoginFormComponent } from "./auth/login/login.component";
import { SignupFormComponent } from "./auth/signup/signup.component";
import { AdminComponent } from "./admin/admin.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";

const routes: Routes = [
    { path: '', component: StartPageComponent, data: { title: 'Marnarsay'} },
    { path: 'Nyheter', component: PostListComponent, data: { title: 'Nyheter'} },
    { path: 'admin/nyheter/skapa', component: PostCreateComponent } ,
    { path: 'admin/nyheter/redigera/:postId', component: PostCreateComponent },
    { path: 'Nyhet/:postId', component: NewsPageComponent},
    { path: 'om-oss', component: OmOssComponent, data: { title: 'Om oss'}},
    { path: 'kontakta-oss', component: KontaktOssComponent, data: { title: 'Kontakta oss'}},
    { path: 'login', component: LoginFormComponent, data: { title: 'logga in'}},
    { path: 'signup', component: SignupFormComponent},
    { path: 'admin', component: AdminComponent, data: { title: 'Admin'}},
    { path: 'admin/nyheter/redigera', component: PostEditComponent, data: { title: 'Redigera'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}