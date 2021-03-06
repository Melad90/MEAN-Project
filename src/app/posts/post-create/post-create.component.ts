import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  private mode = 'create';
  private postId: string;
  post: Post;
  form: FormGroup;
  imagePreview: any;

  editorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Mata in innehållet',
    translate: 'no'
  };

  htmlContent = '<p>Hi</p>';

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;


  constructor(public postsService: PostsService, public route: ActivatedRoute, private authService: AuthService, private Title: Title) {
    this.Title.setTitle('Skapa');
   }

  ngOnInit() {
    let today = new Date();
    let dd = today.getDate(),
        mm = today.getMonth() + 1,
        yyyy = today.getFullYear();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'rubrik': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(5)]
      }),
      'ingress': new FormControl(null),
      'innehall': new FormControl(null, 
        {validators: [Validators.required, Validators.minLength(20)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required], asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
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
          this.form.setValue({
            'rubrik': this.post.rubrik,
            'ingress': this.post.ingress,
            'innehall': this.post.innehall,
            image: this.post.imagePath,
            'Datum': this.post.Datum
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImgPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <String>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    this.authListenerSubs.unsubscribe();
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsService.addPost(this.form.value.rubrik, this.form.value.ingress, this.form.value.innehall, this.form.value.image, this.form.value.Datum); 
    } else {
      this.postsService.updatePost(this.postId, this.form.value.rubrik, this.form.value.ingress, this.form.value.innehall, this.form.value.image);
    }
    this.form.reset();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
