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
      this.rate = res &&  res.rating && res.rating.length;
      this.getUpdatedHelpfulCount(res);
    }))
  }

  getUpdatedHelpfulCount(data: any) {
    let payload = {
      id: data.id,
      phase:  data.phase
    }
    this.apiService.helpfullCount(payload).
    subscribe( (res:any) =>{
      data.Helpful = res.Helpful;
      data.Not_Helpful = res.Not_Helpful;
      this.currentReview = data;
    })
  }

  updateReview() {
    this.apiService.writeReviewAgainInfo.next(this.currentReview);
  }

  updateHelpfulCount(val: string, review: any) {
    let payload = {
      id: review.id,
      phase: review.phase,
      helpful: false,
      nothelpful: false

    }
    if(val == 'helpful') {
      payload.helpful = true;
      payload.nothelpful = false;
    }
    else if(val == 'not helpful') {
      payload.helpful = false;
      payload.nothelpful = true;
    }
    this.apiService.viewhelpful(payload).subscribe((res) => {
      if(val === 'helpful') this.currentReview.Helpful = this.currentReview.Helpful + 1;
      else this.currentReview.Not_Helpful = this.currentReview.Not_Helpful + 1; 
    })
  }

}
