import { Component, OnInit } from '@angular/core';
import { FlightsearchService } from '../flightsearch.service'
import { Router } from '@angular/router'
import { Flights } from '../../Flights'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  departuredate:string;
  departurecity:string;
  arrivalcity:string;
  noofpassenger:number;
  searchflightsData = {
   "departuredate":'',
   "departurecity":'',
   "arrivalcity":'',
   "noofPassengers":''
 }
  constructor(private flightsearchservice: FlightsearchService, private router: Router) { }

  lstflightdetails:Flights[];

  ngOnInit() {
  }

  trySearch(FlightSearchData){
    console.log(FlightSearchData);
    this.searchflightsData.departuredate=FlightSearchData.departuredate;
    this.searchflightsData.departurecity=FlightSearchData.departurecity;
    this.searchflightsData.arrivalcity=FlightSearchData.arrivalcity;
    this.searchflightsData.noofPassengers=FlightSearchData.noofPassengers;
    console.log(this.searchflightsData);
    this.flightsearchservice.tryFlightSearch(this.searchflightsData)
    .subscribe(
      res => {
        console.log(res)
        this.lstflightdetails = res;
        console.log("Printing"+this.lstflightdetails)
        console.log(this.lstflightdetails)
      },
      err => console.log(err)
    )
  }

}
