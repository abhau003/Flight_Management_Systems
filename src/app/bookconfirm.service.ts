import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookconfirmService {

  private bookUrl: string;
  constructor(private http: HttpClient, private router:Router){
    this.bookUrl = "http://localhost:5454/bookconfirm";
  }

  confirmbooking(UserBookingDetails): Observable<any>{

    console.log("Printing"+UserBookingDetails)
    console.log(UserBookingDetails.fullname)
    console.log(UserBookingDetails.emailid)

    return this.http.post<any>(this.bookUrl,UserBookingDetails)
  }
}
