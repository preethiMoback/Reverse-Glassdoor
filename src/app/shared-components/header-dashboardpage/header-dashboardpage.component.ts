import { BehaviorSubject, Subject } from 'rxjs';
import { Apiservice } from './../../services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header-dashboardpage',
  templateUrl: './header-dashboardpage.component.html',
  styleUrls: ['./header-dashboardpage.component.scss']
})
export class HeaderDashboardpageComponent implements OnInit {

  allAllReviewList: any[] = [];

  constructor(private router: Router,
    private apiService: Apiservice,
    private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.apiService.candidateInfo().subscribe((res: any) => {
      res.interview.filter((item: any) => {
        item.phase = 'interview';
        this.getCandidateInfo(item);
      });
      res.offer.filter((item: any) => {
        item.phase = 'offer';
        this.getCandidateInfo(item);
      });
      res.onboarding.filter((item: any) => {
        item.phase = 'onboarding';
        this.getCandidateInfo(item);
      });
    });
  }

  getCandidateInfo(item: any) {
    let payload: any = { candidate_user_id: item.candidate_user_id}
    this.apiService.reviewcandidateInfo(payload).subscribe((res: any) => {
      let val: any = res[0][0];
      item.first_name = val.candidate_first_name;
      item.middle_name = val.candidate_middle_name;
      item.last_name = val.candidate_last_name;
      item.current_org = val.current_organisation_name;
      item.primary_skill = val.primary_skill;
      item.email = val.email_id;
      item.phone_number = val.mobile_number;
      this.prepareData(item);
    },
    (error) => {
      this.toastr.error(error.error.message);
    })
  }

  prepareData(item: any) {
    let curDate: any = new Date();
    let reviewDate: any = new Date(item.update_time);
    let hours = Math.round((curDate - reviewDate) / 36e5);
    item.hours = hours;
    if (item.submission_status == 'pending approval') {
      item.status = 'Approval Pending';
    } else if (item.submission_status == 'rejected') {
      item.status = 'Rejected';
    } else if (item.submission_status == 'approved') {
      item.status = 'Approved';
    }
    if(this.allAllReviewList.length < 5) this.allAllReviewList.push(item);
    this.allAllReviewList.sort((a,b) => a.hours - b.hours )
  }

  removeUserInfo = () =>{
    localStorage.clear();
  }

}
