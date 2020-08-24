import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { BookConfirmComponent } from './book-confirm/book-confirm.component'
import { AuthGuard } from './auth.guard';
import { MybookingsComponent } from './mybookings/mybookings.component';


const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard-page',component:DashboardPageComponent, canActivate: [AuthGuard]},
  {path:'book/:id',component:BookConfirmComponent, canActivate: [AuthGuard]},
  {path:'mybookings',component:MybookingsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
