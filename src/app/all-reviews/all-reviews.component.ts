import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.scss']
})
export class AllReviewsComponent implements OnInit {



  reviewData = [
    {"name": "Manohar Kunireddi", "success":"Approved","rejected":"Rejected","pending":"Approval pending", "by":"Davis Kuruvilla (Bighaat pvt ltd)"},
    {"name": "Amit","rejected":"Rejected","success":"Approved","pending":"Approval pending","by":"Davis Kuruvilla (Bighaat pvt ltd)"},
    {"name": "Puneet ","success":"Approved","rejected":"Rejected","pending":"Approval pending","by":"Davis Kuruvilla (Bighaat pvt ltd)"},

  ];


  constructor() { }

  ngOnInit(): void {
  }

}
