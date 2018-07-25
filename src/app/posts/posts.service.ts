import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private PostsUpdated = new Subject<Post[]>();

    constructor(private httpClient: HttpClient) {}

    getPosts() {
       this.httpClient.get<{message: string, posts: any }>('http://localhost:3000/api/posts')
       .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    innehall: post.innehall,
                    id: post._id
                };
            });
       }))
       .subscribe((Transformedposts) => {
            this.posts = Transformedposts;
            this.PostsUpdated.next([...this.posts]);
       });
    }

    getPostUpdate() {
        return this.PostsUpdated.asObservable();
    }

    deletePost(postId: string) {
        this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.PostsUpdated.next([...this.posts]);
        });
    }

    addPost(title: string, innehall: string) {
        const post: Post = {id: null, title: title, innehall: innehall};
        this.httpClient
        .post<{message: string, postId: string }>('http://localhost:3000/api/posts', post)
        .subscribe(responseData => {
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.PostsUpdated.next([...this.posts]);
        });
    }
}
