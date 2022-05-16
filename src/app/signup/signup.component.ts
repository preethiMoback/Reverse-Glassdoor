import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  rate = 1;
  reviewData = [
    {"name": "Manohar Kunireddi", "success":"Approved","rejected":"Rejected","pending":"Approval pending", "by":"Davis Kuruvilla (Bighaat pvt ltd)"},
    {"name": "Amit","rejected":"Rejected","success":"Approved","pending":"Approval pending","by":"Davis Kuruvilla (Bighaat pvt ltd)"},
    {"name": "Puneet ","success":"Approved","rejected":"Rejected","pending":"Approval pending","by":"Davis Kuruvilla (Bighaat pvt ltd)"},
  ];
 
candidateData = [
    {"name": "Manohar Kunireddi", "success":"Approved","rejected":"Rejected","pending":"Approval pending"},
    {"name": "Amit","rejected":"Rejected","success":"Approved","pending":"Approval pending"},
    {"name": "Puneet ","success":"Approved","rejected":"Rejected","pending":"Approval pending"},
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
