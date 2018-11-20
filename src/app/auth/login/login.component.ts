import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginFormComponent {
    isLoading = false;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    Name = new FormControl('', [Validators.required]);
    getErrorMessageName() {
        return this.Name.hasError('required') ? 'mata in ditt namn!' :
                '';
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

    constructor(public authService: AuthService, private Title: Title) {
        this.Title.setTitle('Logga in');
    }

    onLogin(form: NgForm) {
        if(form.invalid){
            return;
        }
        this.authService.login(form.value.email, form.value.password, form.value.Name);
    }
}