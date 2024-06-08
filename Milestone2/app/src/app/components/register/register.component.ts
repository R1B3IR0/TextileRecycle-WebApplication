import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthRestService } from '../../services/auth-rest.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  userType!: string;

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthRestService) {
    this.createForm();
    
  }

  createForm() {
    this.registrationForm = this.fb.group({
      userType: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      description: [''],
      contact: [''],
      countryCode: [''],
      postalCode: [''],
      addressLocality: [''],
      streetAddress: [''],
      nif: [''],
      address: [''],
      voluntary: [false]
    });
  }

  onSubmit() {
    const formData = this.registrationForm.value;
    if (this.userType === 'Entity') {
      formData.role = 'Entity';
    } else if(this.userType === 'Donator') {
      formData.role = 'Donator';
    } else if(this.userType === 'Voluntary') {
      formData.role = 'Voluntary';
    }
    if (this.userType === 'Voluntary') {
      formData.voluntary = true;
    } else if(this.userType === 'Donator') {
      formData.voluntary = false;
    }

    // Chamando o serviço para registrar o usuário
    this.authService.register(formData).subscribe(
      (response) => {
        alert('Usuário criado com sucesso');
      },
      (error) => {
        console.error('Erro ao criar usuário', error);
        alert('Erro ao criar usuário');
      }
    );
  }
}