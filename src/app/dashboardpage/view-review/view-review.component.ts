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
  reviewerInfo: any;
  constructor(private apiService: Apiservice) { }

  ngOnInit(): void {
    this.reviewerInfo = JSON.parse(localStorage.getItem("currentUserInfo") || '');
    this.apiService.viewReviewDetails.subscribe((res =>{
      if(Object.keys(res).length === 0) {
        res = JSON.parse(localStorage.getItem("viewReviewDetails") || '');
      } else {
        localStorage.setItem("viewReviewDetails", JSON.stringify(res));
      }
      console.log("viewReviewDetails",res);
      this.currentReview = res;
      this.rate = res &&  res.rating && res.rating.length;
    }))
  }

}
