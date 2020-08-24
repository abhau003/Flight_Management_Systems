import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingdetailsretrievalService {

  private getBookingDetailsUrl: string;

  constructor(private http: HttpClient, private router:Router){
    this.getBookingDetailsUrl = "http://localhost:5454/mybookings";
  }

  getbookingdetails(): Observable<any>{
  return this.http.get<any>("http://localhost:5454/mybookings");
  }

}
