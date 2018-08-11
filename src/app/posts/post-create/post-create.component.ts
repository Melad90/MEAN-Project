import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  isLoading = false;
  private mode = 'create';
  private postId: string;
  post: Post;
  form: FormGroup;
  imagePreview: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }
  
  ngOnInit() {
    this.form = new FormGroup({
      'rubrik': new FormControl(null, {
        validators: [ Validators.required, Validators.minLength(5)]
      }),
      'ingress': new FormControl(null, 
        {validators: [Validators.required]
      }),
      'innehall': new FormControl(null, 
        {validators: [Validators.required, Validators.minLength(20)]
      }),
      'image': new FormControl(null, {
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
          this.post = {id: postData._id, rubrik: postData.rubrik, ingress: postData.ingress, innehall: postData.innehall};
          this.form.setValue({
            'rubrik': this.post.rubrik,
            'ingress': this.post.ingress,
            'innehall': this.post.innehall
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
    this.form.patchValue({
      image: file
    });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postsService.addPost(this.form.value.rubrik, this.form.value.ingress, this.form.value.innehall, this.form.value.image); 
    } else {
      this.postsService.updatePost(this.postId, this.form.value.rubrik, this.form.value.ingress, this.form.value.innehall);
    }
    this.form.reset();
  }
}
