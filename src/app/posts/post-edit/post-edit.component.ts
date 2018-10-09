import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


 @Component({
     selector: 'app-post-edit',
     templateUrl: './post-edit.component.html',
     styleUrls: ['./post-edit.component.css']
 })
 export class PostEditComponent implements OnInit, OnDestroy {
     posts: Post[] = [];
     isLoading = false;

     private postsSub: Subscription;
     constructor(public postsService: PostsService) {}

     ngOnInit() {
         this.postsService.getPosts();
         this.isLoading = true;
         this.postsSub = this.postsService.getPostUpdate().subscribe((posts: Post[]) => {
            this.isLoading = false;
            this.posts = posts;
         });
     }

     onDelete(postId: string) {
         this.postsService.deletePost(postId);
     }

     ngOnDestroy() {
         this.postsSub.unsubscribe();
     }
 }