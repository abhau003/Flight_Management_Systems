import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard'
import { LoginService } from './login.service';
import { FlightsearchService } from './flightsearch.service';
import { BookConfirmComponent } from './book-confirm/book-confirm.component';
import { MybookingsComponent } from './mybookings/mybookings.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardPageComponent,
    BookConfirmComponent,
    MybookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,LoginService,FlightsearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
