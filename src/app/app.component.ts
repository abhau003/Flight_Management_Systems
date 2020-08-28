import { Component } from '@angular/core';
import { LoginService } from './login.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';
  dateMessage: string;

  constructor(public loginService:LoginService){
    setInterval(() => {
      let currentDate = new Date();
      this.dateMessage = currentDate.toDateString() + ' ' + currentDate.toLocaleTimeString() + ' ' +"IST";
    },1000);
  }
}
