import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private PostsUpdated = new Subject<Post[]>();

    constructor(private httpClient: HttpClient, private router: Router) {}

    getPosts() {
       this.httpClient.get<{message: string, posts: any }>('http://localhost:3000/api/posts')
       .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    rubrik: post.rubrik,
                    ingress: post.ingress,
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

    getPost(id: string) {
        return this.httpClient.get<{_id: string, rubrik: string, ingress: string, innehall: string}>('http://localhost:3000/api/posts/' + id);
    }

    deletePost(postId: string) {
        this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.PostsUpdated.next([...this.posts]);
        });
    }

    updatePost(id: string, rubrik: string, ingress: string, innehall: string) {
        const post: Post = { id: id, rubrik: rubrik, ingress: ingress, innehall: innehall};
        this.httpClient.put('http://localhost:3000/api/posts/' + id, post )
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostsIndex =  updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostsIndex] = post;
            this.posts = updatedPosts;
            this.PostsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        })
    }

    addPost(rubrik: string, ingress: string, innehall: string, image: File) {
        const formData = new FormData();
        formData.append('rubrik', rubrik);        
        formData.append('ingress', ingress);
        formData.append('innehall', innehall);
        formData.append('image', image, rubrik);
        this.httpClient
        .post<{message: string, postId: string }>('http://localhost:3000/api/posts', formData)
        .subscribe(responseData => {
            const post: Post = {id: responseData.postId, rubrik: rubrik, ingress: ingress, innehall: innehall};
            this.posts.push(post);
            this.PostsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }
}
