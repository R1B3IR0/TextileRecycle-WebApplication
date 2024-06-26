import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { EntityListComponent } from '../app/components/entity-list/entity-list.component';
import { DonationAddComponent } from '../app/components/donation-add/donation-add.component';
import { HomeComponent } from '../app/components/home/home.component';
import { DonationListComponent } from '../app/components/donation-list/donation-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'entity-list', component: EntityListComponent},
  { path: 'donation-add', component: DonationAddComponent, canActivate: [AuthGuardGuard]},  // Rota protegida
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardGuard]},  // Rota protegida
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
