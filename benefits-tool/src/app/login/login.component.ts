import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private ar: ActivatedRoute
  ) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  ngOnInit() { }

  getEmailError() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
      '';
  }

  getPasswordError() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit(): void {
    this.authService.signInWithEmailAndPassword(this.email.value, this.password.value)
      .catch(error => {
        this.errorMessage = error.message;
      });
  }
}
