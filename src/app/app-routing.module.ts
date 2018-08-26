import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from '@angular/router';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { StartPageComponent } from "./startPage/startpage.component";
import { NewsPageComponent } from "./NewsPage/news-page.component";
import { OmOssComponent } from "./OmOss/om-oss.component";
import { KontaktOssComponent } from "./KontaktOss/kontakt-oss.component";

const routes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'Nyheter', component: PostListComponent },
    { path: 'create', component: PostCreateComponent } ,
    { path: 'edit/:postId', component: PostCreateComponent },
    { path: 'Nyhet/:postId', component: NewsPageComponent},
    { path: 'om-oss', component: OmOssComponent},
    { path: 'kontakta-oss', component: KontaktOssComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}