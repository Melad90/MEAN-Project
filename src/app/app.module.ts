import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxEditorModule } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsService } from './posts/posts.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StartPageComponent } from './startPage/startpage.component';
import { NewsPageComponent } from './NewsPage/news-page.component';
import { FooterComponent } from './footer/footer.component';
import { OmOssComponent } from './OmOss/om-oss.component';
import { KontaktOssComponent } from './KontaktOss/kontakt-oss.component';
import { LoginFormComponent } from './auth/login/login.component';
import { SignupFormComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AdminComponent } from './admin/admin.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AngularMaterialModule } from './angular-material.module';
import { OmPrast } from './Info-pages/Prast/prast.component';
import { Kommunion } from './Info-pages/Kommunion/kommunion.component';
import { Dop } from './Info-pages/Dop/dop.component';
import { Biskop } from './Info-pages/Biskop/biskop.component';
import { Aktenskap } from "./Info-pages/Aktenskap/aktenskap.component";

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    StartPageComponent,
    NewsPageComponent,
    FooterComponent,
    OmOssComponent,
    KontaktOssComponent,
    LoginFormComponent,
    SignupFormComponent,
    AdminComponent,
    PostEditComponent,
    ErrorComponent,
    OmPrast,
    Kommunion,
    Dop,
    Biskop,
    Aktenskap
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxEditorModule,
    AngularEditorModule,
    AngularMaterialModule,
    TooltipModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
