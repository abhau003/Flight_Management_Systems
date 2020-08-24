import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Flights } from 'src/Flights';

@Injectable({
  providedIn: 'root'
})
export class FlightsearchService {

  private flightUrl: string;

  constructor(private http: HttpClient, private router:Router){
    this.flightUrl = "http://localhost:5454/dashboard-page";
  }

  tryFlightSearch(UserFlightSearch): Observable<any>{

    console.log(UserFlightSearch.departuredate)
    console.log(UserFlightSearch.departurecity)

    return this.http.post<any>(this.flightUrl,UserFlightSearch)
  }

  getFlightDetails(id:string): Observable<any>{
  return this.http.get<any>(`${this.flightUrl}/${id}`);
  }

}
