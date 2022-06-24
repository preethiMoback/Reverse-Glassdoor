import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-review-reject',
  templateUrl: './view-review-reject.component.html',
  styleUrls: ['./view-review-reject.component.scss']
})
export class ViewReviewRejectComponent implements OnInit {
  rate = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
