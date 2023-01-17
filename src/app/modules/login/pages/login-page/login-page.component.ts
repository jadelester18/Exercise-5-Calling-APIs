import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  loginForm: FormGroup | any;

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(loginForm: FormGroup) {
    this.http.get<any>('http://localhost:3000/user').subscribe(
      (data) => {
        const user = data.find((person: any) => {
          return (
            person.email === this.loginForm.value.email &&
            person.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login Successfully');
          this.loginForm.reset();
          this.route.navigate(['blog']);
        } else {
          alert('Login Failed');
          this.route.navigate(['login']);
        }
      },
      (err) => {
        alert('Something Wrong');
      }
    );
  }
}
