import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginFormComponent {
    loginForm: FormGroup; constructor(private fb: FormBuilder) {
        this.loginForm = fb.group({
            'email': ['', Validators.required, Validators.email],
            'password': ['', [Validators.required, Validators.minLength(8)]]
          });
      }
}