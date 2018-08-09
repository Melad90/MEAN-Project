import { NgModule } from "@angular/core";
import { RouterModule, Routes, Router } from '@angular/router';
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { StartPageComponent } from "./startPage/startpage.component";

const routes: Routes = [
    { path: '', component: StartPageComponent },
    { path: 'Nyheter', component: PostListComponent },
    { path: 'create', component: PostCreateComponent } ,
    { path: 'edit/:postId', component: PostCreateComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}