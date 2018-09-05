import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import  { AuthService } from '../auth.service';

@Component({
  selector: 'signup-form',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupFormComponent {
    isLoading = false;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    getErrorMessageEpost() {
        return this.email.hasError('required') ? 'mata in Epost!' :
            this.email.hasError('email') ? 'Epost är ogiltig!' :
                '';
      }
    getErrorMessagePassword() {
    return this.password.hasError('required') ? 'mata in Lösenordet!' :
            '';
    }

    constructor(public authService: AuthService) {}
    onSignup(form: NgForm) {
        if(form.invalid) {
            return;
        }
        this.authService.createUser(form.value.email, form.value.password);
    }
}