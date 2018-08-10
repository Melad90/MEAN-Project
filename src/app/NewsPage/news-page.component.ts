import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit{
    private postId: string;
    post: Post;

    constructor (public postService: PostsService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')) {
                this.postId = paramMap.get('postId');
                console.log('postId ' + this.postId);
                this.postService.getPost(this.postId).subscribe(postData => {
                    this.post = {id: postData._id, title: postData.title, innehall: postData.innehall};
                });
            }
        });
    }
}