import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestService } from '../../services/auth-rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthRestService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (user: any) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.router.navigate(['/donation-add']);
            alert('Login efetuado com sucesso!');
          } else {
            alert('Erro no login!');
          }
        },
        (error) => {
          alert('Erro no login!');
        }
      );
    }
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
