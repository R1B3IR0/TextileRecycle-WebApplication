import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { RegisterComponent } from '../app/components/register/register.component';
import { EntityListComponent } from '../app/components/entity-list/entity-list.component';
import { DonationAddComponent } from '../app/components/donation-add/donation-add.component';
import { DonationListComponent } from '../app/components/donation-list/donation-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'entity-list', component: EntityListComponent},
  { path: 'donation-add', component: DonationAddComponent},
  { path: 'donation-list', component: DonationListComponent}, // Rota protegida
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }
