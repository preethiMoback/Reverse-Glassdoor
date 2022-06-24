import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-review-pending',
  templateUrl: './view-review-pending.component.html',
  styleUrls: ['./view-review-pending.component.scss']
})
export class ViewReviewPendingComponent implements OnInit {
  rate = 1;


  constructor() { }

  ngOnInit(): void {
  }

}
