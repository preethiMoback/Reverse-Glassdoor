import { BehaviorSubject, Subject } from 'rxjs';
import { Apiservice } from './../../services/api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-dashboardpage',
  templateUrl: './header-dashboardpage.component.html',
  styleUrls: ['./header-dashboardpage.component.scss']
})
export class HeaderDashboardpageComponent implements OnInit {

  allAllReviewList: any[] = [];

  constructor(private router: Router, private apiService: Apiservice) {
   }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData(){
    this.apiService.candidateInfo().subscribe((res: any) => {
      res.interview.filter((item: any) => {
        this.prepareData(item);
      });
      res.offer.filter((item: any) => {
        this.prepareData(item);
      });
      res.onboarding.filter((item: any) => {
        this.prepareData(item);
      });
    });
  }

  prepareData(item: any) {
    if (item.submission_status == 'pending approval') {
      item.status = 'Approval Pending';
    } else if (item.submission_status == 'rejected') {
      item.status = 'Rejected';
    } else if (item.submission_status == 'approved') {
      item.status = 'Approved';
    }
    this.allAllReviewList.push(item);
  }

  removeUserInfo = () =>{
    localStorage.removeItem("currentUserInfo");
  }

}
