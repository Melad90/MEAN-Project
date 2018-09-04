import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

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
            this.email.hasError('email') ? 'Epost är ogiltig!' :
                '';
      }
    getErrorMessagePassword() {
    return this.password.hasError('required') ? 'mata in Lösenordet!' :
            '';
    }

    onLogin(form: NgForm) {
        
    }
}