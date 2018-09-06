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

const routes: Routes = [
    { path: '', component: StartPageComponent, data: { title: 'Marnarsay'} },
    { path: 'Nyheter', component: PostListComponent, data: { title: 'Nyheter'} },
    { path: 'create', component: PostCreateComponent } ,
    { path: 'edit/:postId', component: PostCreateComponent },
    { path: 'Nyhet/:postId', component: NewsPageComponent},
    { path: 'om-oss', component: OmOssComponent, data: { title: 'Om oss'}},
    { path: 'kontakta-oss', component: KontaktOssComponent, data: { title: 'Kontakta oss'}},
    { path: 'login', component: LoginFormComponent, data: { title: 'logga in'}},
    { path: 'signup', component: SignupFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}