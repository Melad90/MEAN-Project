import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Title } from '@angular/platform-browser';


 @Component({
     selector: 'app-post-edit',
     templateUrl: './post-edit.component.html',
     styleUrls: ['./post-edit.component.css']
 })
 export class PostEditComponent implements OnInit, OnDestroy {
     posts: Post[] = [];
     isLoading = false;
     userIsAuthenticated = false;
     userId: string;
     private authListenerSubs: Subscription;
     private postsSub: Subscription;
     constructor(public postsService: PostsService, private authService: AuthService, private Title: Title) {
        this.Title.setTitle('Redigera');
     }

     ngOnInit() {
         this.postsService.getPosts();
         this.isLoading = true;
         this.userId = this.authService.getUserId();
         this.postsSub = this.postsService.getPostUpdate().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
         });
         this.userIsAuthenticated = this.authService.getIsAuth();
         this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
        })
     }

     onDelete(postId: string) {
         this.postsService.deletePost(postId);
     }

     ngOnDestroy() {
         this.authListenerSubs.unsubscribe();
         this.postsSub.unsubscribe();
     }
 }