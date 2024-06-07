import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestService } from '../../services/auth-rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router, private authServive: AuthRestService) { 
    this.email = "";
    this.password = "";
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authServive.login(this.email, this.password).subscribe((user: any) => { 
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate([user.dashboardUrl]);
      } else {
        alert('Erro no login!');
      }
    })
    // Redirect to Home page
    this.router.navigate(['/']);

  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
