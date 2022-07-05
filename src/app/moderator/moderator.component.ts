import { Router } from '@angular/router';
import { Apiservice } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.scss']
})
export class ModeratorComponent implements OnInit {

  pendingReviewList: any[] = [];
  constructor(private apiService: Apiservice, private router: Router) { }

  ngOnInit(): void {
    this.apiService.candidateInfo().subscribe((res: any) => {
      res.interview.filter((item: any) => {
        if (item.submission_status == 'pending approval') {
          this.pendingReviewList.push(item);
        }
      });
      res.offer.filter((item: any) => {
        if (item.submission_status == 'pending approval') {
          this.pendingReviewList.push(item);
        }
      });
      res.onboarding.filter((item: any) => {
        if (item.submission_status == 'pending approval') {
          this.pendingReviewList.push(item);
        }
      });
    });
  }


  viewReview(candidate: any){
    console.log(candidate);
    this.router.navigate(['/dashboardreview']);
  }

}
