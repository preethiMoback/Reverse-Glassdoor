import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-review',
  templateUrl: './dashboard-review.component.html',
  styleUrls: ['./dashboard-review.component.scss']
})
export class DashboardReviewComponent implements OnInit {
  rate = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

}
