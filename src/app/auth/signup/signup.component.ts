import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import  { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupFormComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus =>  {
                this.isLoading = false;
            }
        );
    }
    getErrorMessageEpost() {
        return this.email.hasError('required') ? 'mata in Epost!' :
            this.email.hasError('email') ? 'Ogiltigt E-post format!' :
                '';
    }
    getErrorMessagePassword() {
    return this.password.hasError('required') ? 'mata in Lösenordet!' :
            '';
    }

    onSignup(form: NgForm) {
        if(form.invalid) {
            return;
        }
        this.isLoading = true;
        this.authService.createUser(form.value.email, form.value.password);
    }

    ngOnDestroy(){
        this.authStatusSub.unsubscribe();
    }
}