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
import { AuthGuard } from "./auth/auth.guard";
import { Aktenskap } from "./Info-pages/Aktenskap/aktenskap.component";
import { Biskop } from "./Info-pages/Biskop/biskop.component";
import { Dop } from "./Info-pages/Dop/dop.component";
import { Kommunion } from "./Info-pages/Kommunion/kommunion.component";
import { OmPrast } from "./Info-pages/Prast/prast.component";

const routes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'Nyheter', component: PostListComponent },
    { path: 'admin/nyheter/skapa', component: PostCreateComponent, canActivate: [AuthGuard] } ,
    { path: 'admin/nyheter/redigera/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'Nyhet/:postId', component: NewsPageComponent},
    { path: 'om-oss', component: OmOssComponent },
    { path: 'kontakta-oss', component: KontaktOssComponent },
    { path: 'login', component: LoginFormComponent},
    { path: 'signup', component: SignupFormComponent},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
    { path: 'admin/nyheter/redigera', component: PostEditComponent, canActivate: [AuthGuard]},
    { path: 'Aktenskap', component: Aktenskap },
    { path: 'Biskop', component: Biskop },
    { path: 'Dop', component: Dop },
    { path: 'Kommunion', component: Kommunion },
    { path: 'Prast', component: OmPrast }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}