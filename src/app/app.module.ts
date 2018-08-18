import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { 
  MatCardModule, 
  MatInputModule, 
  MatButtonModule, 
  MatToolbarModule, 
  MatExpansionModule, 
  MatProgressSpinnerModule, 
  MatPaginatorModule 
} from '@angular/material';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostsService } from './posts/posts.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StartPageComponent } from './startPage/startpage.component';
import { NewsPageComponent } from './NewsPage/news-page.component';
import { FooterComponent } from './footer/footer.component';
import { OmOssComponent } from './OmOss/om-oss.component';

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
    OmOssComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxEditorModule,
    TooltipModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
