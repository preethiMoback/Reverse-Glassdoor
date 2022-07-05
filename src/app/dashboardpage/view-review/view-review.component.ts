import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent implements OnInit {
  rate = 1;
  currentReview: any;
  constructor(private apiService: Apiservice) { }

  ngOnInit(): void {
    this.apiService.viewReviewDetails.subscribe((res =>{
      console.log(res);
      this.currentReview = res;
      this.rate = res &&  res.rating && res.rating.length;
    }))
  }

}
