import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  rate = 4;
 
  candidateData = [
      {"name": "Manohar Kunireddi", "success":"Approved","rejected":"Rejected","pending":"Approval pending"},
      {"name": "Amit","rejected":"Rejected","success":"Approved","pending":"Approval pending"},
      {"name": "Puneet ","success":"Approved","rejected":"Rejected","pending":"Approval pending"},
      ]
  constructor() { }

  ngOnInit(): void {
  }

}
