import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl: string;

  constructor(private http: HttpClient, private router:Router){
    this.apiUrl = "http://localhost:5454/login";
  }

  tryLogin(User): Observable<any>{

    console.log(User.username)
    console.log(User.password)

    return this.http.post<any>(this.apiUrl,User)
  }

  loggedIn()
  {
    return !!localStorage.getItem('token')
  }

  logoutUser()
  {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}