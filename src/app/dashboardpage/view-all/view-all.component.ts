import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {
  rate = 4;
  reviewList: any[] = [];
  type: string = 'allReview';
  constructor(private apiService: Apiservice) {
    this.apiService.currentReviewList.subscribe(res =>{
      console.log(res);
      this.reviewList = res.data;
      this.type = res.type;
    });
   }

  ngOnInit(): void {
  }

}
