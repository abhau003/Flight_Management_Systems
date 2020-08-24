import { Component, OnInit } from '@angular/core';
import { FlightsearchService } from '../flightsearch.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Flights } from '../../Flights'
import { BookconfirmService } from '../bookconfirm.service'
import { Bookeddetails } from '../bookeddetails'

@Component({
  selector: 'app-book-confirm',
  templateUrl: './book-confirm.component.html',
  styleUrls: ['./book-confirm.component.css']
})
export class BookConfirmComponent implements OnInit {

  lstflights:[];
  bookings:Bookeddetails[];
  pnr:String;

  searchflightsData = {
    "departuredate":'',
    "departurecity":'',
    "arrivalcity":'',
    "noofPassengers":''
  }
  
  constructor(private flightsearchService:FlightsearchService, private bookconfirmservice:BookconfirmService, private actroute:ActivatedRoute,
    private router:Router) {
   }

  ngOnInit() {
    const id = this.actroute.snapshot.paramMap.get('id');    
    this.flightsearchService.getFlightDetails(id)
    .subscribe(
      (res) => {
        console.log(res)
        this.lstflights = res
        console.log("Printing" + this.lstflights)
        console.log(this.lstflights)
      },
      err => console.log(err)
    )}

    confirmbook(bookingdata){
      console.log("Booking Data")
      console.log(bookingdata)
      this.bookconfirmservice.confirmbooking(bookingdata)
      .subscribe(
        res => {
          console.log(res)
          this.pnr = res;
          console.log("Printing"+this.pnr)
          window.alert("PNR Number is :" +res.pnr);
          this.router.navigate(['/mybookings'])
        },
        err => console.log(err)
      )} 
    }

