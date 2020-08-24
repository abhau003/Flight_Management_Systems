import { Component, OnInit } from '@angular/core';
import { BookingdetailsretrievalService } from '../bookingdetailsretrieval.service'
import { Router } from '@angular/router'
import { Bookingdetails } from '../bookingdetails'

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {

  lstbookingdetails:Bookingdetails[];

  constructor(private bookingdetailsretrieval:BookingdetailsretrievalService,private router:Router) { }

  ngOnInit(){

  this.bookingdetailsretrieval.getbookingdetails()
      .subscribe(
        res => {
          console.log(res)
          this.lstbookingdetails = res;
          console.log("Printing"+this.lstbookingdetails)
          console.log(this.lstbookingdetails)
        },
        err => console.log(err)
      )
    }
  
  }
