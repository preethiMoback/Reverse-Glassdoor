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
    // { "id": "2", "player_name": "Cristiano", "country": "Pourtgal", "club": "Juventus" },
    // { "id": "3", "player_name": "Henry", "country": "France", "club": "Buyren" },
    // { "id": "4", "player_name": "Kimmichch", "country": "Germany", "club": "Buyren" },
    // { "id": "5", "player_name": "Paul", "country": "France", "club": "Manchester United" },
    // { "id": "6", "player_name": "Eden", "country": "Belgium", "club": "Real Madrid" },
    // { "id": "7", "player_name": "Coman", "country": "Netherland", "club": "Barcelona" },
    // { "id": "8", "player_name": "Zycich", "country": "NA", "club": "Chelesa" }
      ]
  constructor() { }

  ngOnInit(): void {
  }

}
