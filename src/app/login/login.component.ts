import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Login'

  form = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue())
        .subscribe({
          next: value => {
            if (value && value.token !== '') {
              this.authService.setLoginUser(value);
            }
          }
        });
    }
  }
}
