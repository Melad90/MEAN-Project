import {Post} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { DatepickerModule } from 'ngx-bootstrap';


const BACKEND_URL = environment.apiUrl + "/posts";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private PostsUpdated = new Subject<Post[]>();

    constructor(private httpClient: HttpClient, private router: Router) {}
    
    getPosts() {
       this.httpClient.get<{message: string, posts: any }>(BACKEND_URL)
       .pipe(map((postData) => {
            return postData.posts.map(post => { if (post.ingress == 'null' || post.ingress == 'undefined')
            {return {
                rubrik: post.rubrik,
                ingress: '',
                innehall: post.innehall,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                creatorID: post.creatorID,
                Datum: post.Datum                
            };} else{
                return {
                    rubrik: post.rubrik,
                    ingress: post.ingress,
                    innehall: post.innehall,
                    id: post._id,
                    imagePath: post.imagePath,
                    creator: post.creator,
                    creatorID: post.creatorID,
                    Datum: post.Datum
                };}
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
        return this.httpClient.get<{_id: string, rubrik: string, ingress: string, innehall: string, imagePath: string, creator: string, creatorID: string, Datum: string}>(
            BACKEND_URL +"/"+ id
        );
    }

    deletePost(postId: string) {
        this.httpClient.delete(BACKEND_URL +"/"+ postId)
        .subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.PostsUpdated.next([...this.posts]);
        });
    }

    updatePost(id: string, rubrik: string, ingress: string, innehall: string, image: any) {
        let postData: Post | FormData;
        if(typeof(image) === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('rubrik', rubrik);
            postData.append('ingress', ingress);
            postData.append('innehall', innehall);
            postData.append('image', image, rubrik);
        } else {
            postData = {
                id: id,
                rubrik: rubrik,
                ingress: ingress,
                innehall: innehall,
                imagePath: image,
                creator: null,
                creatorID: null,
                Datum: null
            };
        }

        this.httpClient.put(BACKEND_URL +"/"+ id, postData )
        .subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostsIndex =  updatedPosts.findIndex(p => p.id === id);
            const post: Post = {
                id: id,
                rubrik: rubrik,
                ingress: ingress,
                innehall: innehall,
                imagePath: "",
                creator: null,
                creatorID: null,
                Datum: null
            }
            updatedPosts[oldPostsIndex] = post;
            this.posts = updatedPosts;
            this.PostsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        })
    }

    addPost(rubrik: string, ingress: string, innehall: string, image: File, Datum: string) {
        const formData = new FormData();
        formData.append('rubrik', rubrik);        
        formData.append('ingress', ingress);
        formData.append('innehall', innehall);
        formData.append('image', image, rubrik);
        this.httpClient
        .post<{message: string, post: Post }>(BACKEND_URL, formData)
        .subscribe(responseData => {
            const post: Post = {id: responseData.post.id, rubrik: rubrik, ingress: ingress, innehall: innehall, imagePath: responseData.post.imagePath, creator: responseData.post.creator, creatorID: responseData.post.creatorID, Datum: responseData.post.Datum};
            this.posts.push(post);
            this.PostsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
        });
    }
}
