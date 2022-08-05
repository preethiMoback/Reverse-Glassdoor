import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  rate = 4;
  reviewList: any[] = [];
  type: string = 'allReview';
  constructor(private apiService: Apiservice,
    private router: Router) {
   }

  ngOnInit(): void {
    this.apiService.currentReviewList.subscribe(res =>{
      console.log("currentRevList",res);
      if(Object.keys(res).length === 0) {
        res = JSON.parse(localStorage.getItem("currentReviewList") || '');
      } else {
        localStorage.setItem("currentReviewList", JSON.stringify(res));
      }
      this.reviewList = res.data;
      this.type = res.type;
    });
  }

  goToViewReview(candidate: any) {
    this.apiService.viewReviewDetails.next(candidate);
    this.router.navigate(['/viewreview']);
  }

}
