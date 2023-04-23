import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [ 
  {
    path: '',
    pathMatch: 'full',
   component: LandingComponent
  },
  {
    path: 'login',
   component: LoginComponent
  },
  {
    path: 'register',
   component: RegisterComponent
  },
  {
    path: 'home',
   component: HomeComponent
  },
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
