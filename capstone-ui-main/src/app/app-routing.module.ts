import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LeadFormComponent} from "./lead-form/lead-form.component";
import {IndicativeStateComponent} from "./indicative-state/indicative-state.component";
import { InitialMultiFormComponent } from './initial-multi-form/initial-multi-form.component';


const routes: Routes = [
  { path: '', component: InitialMultiFormComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lead-form', component: LeadFormComponent },
  {path: 'indicative-state', component: IndicativeStateComponent},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
