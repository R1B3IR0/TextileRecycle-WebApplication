import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component'; 
import { authInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { DonationAddComponent } from './components/donation-add/donation-add.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EntityListComponent,
    DonationAddComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: authInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
