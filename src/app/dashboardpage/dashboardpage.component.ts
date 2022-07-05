import { FormDataService } from 'src/app/dashboardpage/advanced-search/form-data.service';
import { Router } from '@angular/router';
import { Apiservice } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss'],
})
export class DashboardpageComponent implements OnInit {
  rate = 4;
  url: any = '../../assets/Images/profile_img.svg';
  msg = '';
  searchKey: string = '';
  currentUserName: string = '';
  currentUserEmail: string = '';
  candidateFeedbackCountList = {
    allReview: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  };
  details: any;
  currentTabIndex: number = 0;

  allReviewList: any[] = [];
  approvedList: any[] = [];
  rejectedList: any[] = [];
  pendingList: any[] = [];

  allAllReviewList: any[] = [];
  allApprovedList: any[] = [];
  allRejectedList: any[] = [];
  allPendingList: any[] = [];

  constructor(
    private apiService: Apiservice,
    private router: Router,
    private formData: FormDataService
  ) {}

  ngOnInit(): void {
    this.apiService.currenUserInfo.subscribe(res =>{
      if(this.isObjectEmpty(res)){
        console.log('test');
        res = JSON.parse(localStorage.getItem('currentUserInfo') || '');
      }
      console.log(res);
      this.currentUserName = res.first_name + " " + res.middle_name + " " + res.last_name;
      this.currentUserEmail = res.current_org_mail_id;
    })

    this.apiService.candidateFeedbackCount().subscribe((res: any) => {
      console.log(res);
      this.candidateFeedbackCountList.allReview =
        res.All_phases['Total feedback given'];
      this.candidateFeedbackCountList.approved =
        res.All_phases['Total Approved'];
      this.candidateFeedbackCountList.rejected =
        res.All_phases['Total Rejected'];
      this.candidateFeedbackCountList.pending =
        res.All_phases['Pending Approval'];
    });

    this.apiService.candidateInfo().subscribe((res: any) => {
      res.interview.filter((item: any) => {
        item.phase = 'interview';
        this.findHelpulNotHelpFull(item,'interview');
      });
      res.offer.filter((item: any) => {
        item.phase = 'offer';
        this.findHelpulNotHelpFull(item,'offer');
      });
      res.onboarding.filter((item: any) => {
        item.phase = 'onboarding';
        this.findHelpulNotHelpFull(item,'onboarding');
      });
    });
  }
  
  isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  findHelpulNotHelpFull(item: any, phase: string){
    let payload = {
      id: item.id,
      phase:  phase
    }
    this.apiService.helpfullCount(payload).
    subscribe( (res:any) =>{
      console.log(res);
      item.Helpful = res.Helpful;
      item.Not_Helpful = res.Not_Helpful;
      this.prepareData(item);
    })
  }

  searchByName() {
    this.router.navigate(['/searchresult']);
    let name = this.searchKey.split(' ');
    let payload: any = {};
    if (name.length > 0 && name) payload.first_name = name[0];
    if (name.length > 1 && name) payload.last_name = name[1];
    this.formData.setData(
      (this.details = this.searchKey + ',')
    );

    this.apiService.candidateAdvanceSearch(payload).subscribe((res: any) => {
      console.log(res);
      this.apiService.filteredResult.next(res.data);
    });
  }

  prepareData(item: any) {
    if (item.submission_status == 'pending approval') {
      item.status = 'Approval Pending';
      if (this.pendingList.length < 5) this.pendingList.push(item);
      this.allPendingList.push(item);
    } else if (item.submission_status == 'rejected') {
      item.status = 'Rejected';
      if (this.rejectedList.length < 5) this.rejectedList.push(item);
      this.allRejectedList.push(item);
    } else if (item.submission_status == 'approved') {
      item.status = 'Approved';
      if (this.approvedList.length < 5) this.approvedList.push(item);
      this.allApprovedList.push(item);
    }
    if (this.allReviewList.length < 5) this.allReviewList.push(item);
    this.allAllReviewList.push(item);
  }

  viewReview(candidate: any){
    console.log(candidate);
    let payload: any = {
      id: candidate.id,
      phase: candidate.phase
    }
    this.apiService.viewReview(payload)
      .subscribe((res: any) =>{
        
        this.apiService.helpfullCount(payload)
          .subscribe((count: any) =>{
            res.data[0].Helpful = count.Helpful;
            res.data[0].Not_Helpful = count.Not_Helpful;
            res.data[0].phase = candidate.phase;
            res.data[0].status = candidate.status;



            this.apiService.viewReviewDetails.next(res.data[0]);
            this.router.navigate(['/viewreview']);
          })
      })
  }

  tabChange(tabIndex:  number){
    console.log(tabIndex);
    this.currentTabIndex = tabIndex;
  }

  goToViewAll(){
    console.log(this.currentTabIndex);
    this.apiService.currentReviewList.next({});
    if(this.currentTabIndex == 0)this.apiService.currentReviewList.next({data: this.allAllReviewList, type: 'allReview'});
    else if(this.currentTabIndex == 1)this.apiService.currentReviewList.next({data: this.allApprovedList, type: 'allApprove'});
    else if(this.currentTabIndex == 2)this.apiService.currentReviewList.next({data: this.allRejectedList, type: 'allReject'});
    else if(this.currentTabIndex == 3)this.apiService.currentReviewList.next({data: this.allPendingList, type: 'allPending'});

    this.router.navigate(['/viewall']);
  }

  onSelectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.url = reader.result;
    };
  }
}
