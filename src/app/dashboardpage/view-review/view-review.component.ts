import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent implements OnInit {
  rate = 1;
  currentReview: any;
  reviewerInfo: any;
  modalHeader: string = '';
  modalContent: string = '';
  confirmRejection: boolean = false;
  reason: string = '';
  selectedStatus: string = '';
  constructor(private apiService: Apiservice,
    private toastr: ToastrService,
    private router: Router) { }

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
      this.getHelpfulInfo(data);
    })
  }

  getHelpfulInfo(data: any) {
    if(data.submission_status === 'approved') {
      let payload: any = {id: data.id, phase: data.phase};
      this.apiService.helpfulInfo(payload).subscribe((res: any) => {
        data.helpfulSelected = res.Helpful;
        data.nothelpfulSelected = res.Not_helpful;
        this.currentReview = data;
      })
    } else this.currentReview = data;
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
      this.currentReview.helpfulSelected = 1;
      this.currentReview.nothelpfulSelected = 0;
    }
    else if(val == 'not helpful') {
      payload.helpful = false;
      payload.nothelpful = true;
      this.currentReview.helpfulSelected = 0;
      this.currentReview.nothelpfulSelected = 1;
    }
    this.apiService.viewhelpful(payload).subscribe((res) => {
        let helpfulCountpayload = {
          id: this.currentReview.id,
          phase:  this.currentReview.phase
        }
        this.apiService.helpfullCount(helpfulCountpayload).
        subscribe( (res:any) =>{
          this.currentReview.Helpful = res.Helpful;
          this.currentReview.Not_Helpful = res.Not_Helpful;
        })
    })
  }

  moderatorAction(val: string, submit: boolean) {
    this.confirmRejection = false;
    this.selectedStatus = val;
    let payload: any = {};
    payload.id = this.currentReview.id;
    payload.phase = this.currentReview.phase;
    payload.submission_status = val;
    if(val === 'approved') {
      this.modalHeader = 'Approve ?';
      this.modalContent = 'You are about to approve the review with this action. Are you sure you want to approve?';
      payload.justification_for_rejection = ''
    }
    else if(val === 'rejected') {
      this.modalHeader = 'Reason For Rejection'
      payload.justification_for_rejection = this.reason
    }
    console.log(payload);
    if(submit) {
      this.apiService.statusUpdateByMorderator(payload).subscribe(res => {
        let el = document.getElementById("cancelButton") as HTMLButtonElement;
        el.click();
        this.router.navigate(['/dashboardpage']);
        let toastrMsg = 'Review ' + val + ' succesfully';
        this.toastr.success(toastrMsg);
      })
    }
  }

  onCancel() {
    this.modalHeader = '';
    this.modalContent = '';
    this.reason = '';
    this.confirmRejection = false;
  }

  onSubmit() {
    this.confirmRejection = true;
    this.modalHeader = 'Reject ?';
    this.modalContent = 'You are about to reject the review. Have you given the valid reason for rejection ?';
    
  }

}
