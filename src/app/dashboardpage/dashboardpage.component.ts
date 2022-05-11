import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss']
})
export class DashboardpageComponent implements OnInit {
  candidateData = [
    {"name": "Manohar Kunireddi", "success":"Approved","rejected":"Rejected","pending":"Approval pending"},
    {"name": "Amit","rejected":"Rejected","success":"Approved","pending":"Approval pending"},
    {"name": "Puneet ","success":"Approved","rejected":"Rejected","pending":"Approval pending"},
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
