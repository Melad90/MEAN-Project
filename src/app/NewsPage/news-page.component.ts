import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit{
    private postId: string;
    post: Post;
    ArPost: Post;

    constructor (public postService: PostsService, public route: ActivatedRoute, private Title: Title) {}

    ngOnInit() {
        let Arabic = /^([\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufbc1]|[\ufbd3-\ufd3f]|[\ufd50-\ufd8f]|[\ufd92-\ufdc7]|[\ufe70-\ufefc]|[\ufdf0-\ufdfd]|[ ])*$/g;
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if(paramMap.has('postId')) {
                this.postId = paramMap.get('postId');
                this.postService.getPost(this.postId).subscribe(postData => { 
                    if (postData.ingress == 'null' || postData.ingress == 'undefined'){
                        this.post = {
                            id: postData._id, 
                            rubrik: postData.rubrik, 
                            ingress: '', 
                            innehall: postData.innehall,
                            imagePath: postData.imagePath,
                            creator: postData.creator,
                            creatorID: postData.creatorID,
                            Datum: postData.Datum
                        };
                        if(Arabic.test(this.post.rubrik) === true){
                            this.ArPost = {
                                id: this.post.id,
                                rubrik: this.post.rubrik,
                                ingress: '',
                                innehall: this.post.innehall,
                                imagePath: this.post.imagePath,
                                creator: this.post.creator,
                                creatorID: this.post.creatorID,
                                Datum: this.post.Datum
                            };
                        }this.Title.setTitle(this.post.rubrik);}
                    else{
                        this.post = {
                            id: postData._id, 
                            rubrik: postData.rubrik, 
                            ingress: postData.ingress, 
                            innehall: postData.innehall,
                            imagePath: postData.imagePath,
                            creator: postData.creator,
                            creatorID: postData.creatorID,
                            Datum: postData.Datum
                        };
                        if(Arabic.test(this.post.rubrik) === true){
                            this.ArPost = {
                                id: this.post.id,
                                rubrik: this.post.rubrik,
                                ingress: this.post.ingress,
                                innehall: this.post.innehall,
                                imagePath: this.post.imagePath,
                                creator: this.post.creator,
                                creatorID: this.post.creatorID,
                                Datum: this.post.Datum
                            };
                        }this.Title.setTitle(this.post.rubrik);
                    }
                });
            }
        });
    }
}