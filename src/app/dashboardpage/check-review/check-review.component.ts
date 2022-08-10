import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from './../../services/api.service';

@Component({
  selector: 'app-check-review',
  templateUrl: './check-review.component.html',
  styleUrls: ['./check-review.component.scss']
})
export class CheckReviewComponent implements OnInit {

  allReviews: any[] = [];
  candidateInfo: any;

  constructor(  private apiService: Apiservice,
    private router: Router,) { }

  ngOnInit(): void {
    this.apiService.checkReviewsInfo.subscribe((res: any) => {
      if(Object.keys(res).length === 0) {
        res = JSON.parse(localStorage.getItem("candidInfo") || '');
      } else {
        localStorage.setItem("candidInfo", JSON.stringify(res));
      }
      console.log(res);
      this.candidateInfo = res;
      let payload: any = {candidate_user_id: res.candidate_user_id};
      this.apiService.getCandidateReviews(payload).subscribe((result: any) => {
        result.interview.filter((item: any) => {
          item.phase = 'interview';
          this.findHelpulNotHelpFull(item,'interview');
        });
        result.offer.filter((item: any) => {
          item.phase = 'offer';
          this.findHelpulNotHelpFull(item,'offer');
        });
        result.onboarding.filter((item: any) => {
          item.phase = 'onboarding';
          this.findHelpulNotHelpFull(item,'onboarding');
        });
      })
    })
  }

  findHelpulNotHelpFull(item: any, phase: string){
    let payload = {
      id: item.review_id,
      phase: phase
    }
    this.apiService.helpfullCount(payload).
    subscribe( (res:any) =>{
      item.Helpful = res.Helpful;
      item.Not_Helpful = res.Not_Helpful;
      this.allReviews.push(item);
    })
  }

  goToWriteReview(candidate: any) {
    localStorage.removeItem('viewReviewDetails');
    this.apiService.writeReviewAgainInfo.next(candidate);
    this.router.navigate(['/candidatereview']);
  }

  updateHelpfulCount(val: string, review: any) {
    let payload = {
      id: review.review_id,
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
      this.allReviews.forEach((item:  any) => {
        if(item.review_id === review.review_id) {
          if(val === 'helpful') item.Helpful = item.Helpful + 1;
          else item.Not_Helpful = item.Not_Helpful + 1; 
        }
      })
    })
  }
}
