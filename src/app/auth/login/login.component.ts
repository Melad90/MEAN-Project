import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginFormComponent {
    isLoading = false;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    getErrorMessageEpost() {
        return this.email.hasError('required') ? 'mata in Epost!' :
            this.email.hasError('email') ? 'Ogiltigt E-post format!' :
                '';
      }
    getErrorMessagePassword() {
    return this.password.hasError('required') ? 'mata in Lösenordet!' :
            '';
    }

    constructor(public authService: AuthService) {}

    onLogin(form: NgForm) {
        if(form.invalid){
            return;
        }
        this.authService.login(form.value.email, form.value.password);
    }
}