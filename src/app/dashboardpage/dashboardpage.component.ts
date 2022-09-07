import { FormDataService } from 'src/app/dashboardpage/advanced-search/form-data.service';
import { Router } from '@angular/router';
import { Apiservice } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  currentUserImage: any = '';
  token: string = localStorage.getItem('token') || '';
  candidateFeedbackCountList = {
    allReview: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  };
  details: any;
  currentTabIndex: number = 0;
  showApprovedNotification: boolean = false;
  showRejectedNotification: boolean = false;

  candidateList: any[] = [];

  allReviewList: any[] = [];
  approvedList: any[] = [];
  rejectedList: any[] = [];
  pendingList: any[] = [];

  allAllReviewList: any[] = [];
  allApprovedList: any[] = [];
  allRejectedList: any[] = [];
  allPendingList: any[] = [];

  type: string = '';

  constructor(
    private apiService: Apiservice,
    private router: Router,
    private formData: FormDataService,
    private toastr: ToastrService
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
      this.currentUserImage = res.pic ? "http://54.208.4.29:8080/" + res.pic : "../../assets/Images/image_icon.svg";
      this.type = res.user_category;
    })

    this.apiService.candidateFeedbackCount().subscribe((res: any) => {
      console.log("feedbackcount",res);
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
      console.log("all reviews info",res);
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
      item.Helpful = res.Helpful;
      item.Not_Helpful = res.Not_Helpful;
      this.getCandidateInfo(item);
    })
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
      item.country_code = val.country_code;
      item.phone_number = val.mobile_number;
      this.getHelpfulInfo(item);
    },
    (error) => {
      this.toastr.error(error.error.message);
    })
  }

  getHelpfulInfo(item: any) {
    if(item.submission_status === 'approved') {
      let payload: any = {id: item.id, phase: item.phase};
      this.apiService.helpfulInfo(payload).subscribe((res: any) => {
        item.helpfulSelected = res.Helpful;
        item.nothelpfulSelected = res.Not_helpful;
        this.prepareData(item);
      })
    } else this.prepareData(item);
  }

  searchByName() {
    if(this.searchKey.length) {
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
    else {
      this.toastr.error("Please enter a value to be searched")
    }
  }

  prepareData(item: any) {
    if(this.type === 'moderator') {
      let payload = {user_id: item.user_id};
      this.apiService.getReviewverInfo(payload).subscribe((res: any) => {
        item.reviewerName = res.data["Full name"];
        item.reviewerOrg = res.data.current_org;
      })
    }
    if (item.submission_status == 'pending approval') {
      item.status = 'Approval Pending'; 
      if (this.pendingList.length < 5) this.pendingList.push(item);
      this.allPendingList.push(item);
    } else if (item.submission_status == 'rejected') {
      item.status = 'Rejected';
      if(item.viewed === 'False') this.showRejectedNotification = true;
      if (this.rejectedList.length < 5) this.rejectedList.push(item);
      this.allRejectedList.push(item);
    } else if (item.submission_status == 'approved') {
      item.status = 'Approved';
      if(item.viewed === 'False') this.showApprovedNotification = true;
      if (this.approvedList.length < 5) this.approvedList.push(item);
      this.allApprovedList.push(item);
    }
    if (this.allReviewList.length < 5) this.allReviewList.push(item);
    this.allAllReviewList.push(item);

    this.candidateList = this.allReviewList;
    this.candidateList.sort((a: any,b: any) => new Date(b.update_time).getTime() - new Date(a.update_time).getTime() );
  }

  viewReview(candidate: any){
    // console.log("candidate", candidate);
    // let payload: any = {
    //   id: candidate.id,
    //   phase: candidate.phase
    // }
    // this.apiService.viewReview(payload)
    //   .subscribe((res: any) =>{
    //     console.log("viewReview", res);
        // this.apiService.helpfullCount(payload)
        //   .subscribe((count: any) =>{
            // res.data[0].Helpful = count.Helpful;
            // res.data[0].Not_Helpful = count.Not_Helpful;
            // res.data[0].phase = candidate.phase;
            // res.data[0].status = candidate.status;
            // console.log("helpfullcount", count)

            this.apiService.viewReviewDetails.next(candidate);
            this.router.navigate(['/viewreview']);
          // })
      // })
  }

  tabChange(tabIndex:  number){
    console.log(tabIndex);
    let approvedPayload: any = [];
    let rejectedPayload: any = [];
    this.currentTabIndex = tabIndex;
    if(this.currentTabIndex === 0) this.candidateList = this.allReviewList;
    else if(this.currentTabIndex === 1) {
      this.showApprovedNotification = false;
      this.allApprovedList.forEach((item: any) => {
        if(item.viewed === 'False') {
          approvedPayload.push({id: item.id, phase: item.phase});
        }
      })
      if(approvedPayload.length)
        this.apiService.updateNotifications(approvedPayload).subscribe((res: any) => console.log(res))
      this.candidateList = this.approvedList;
    }
    else if(this.currentTabIndex === 2) {
      this.showRejectedNotification = false;
      this.allRejectedList.forEach((item: any) => {
        if(item.viewed === 'False') {
          rejectedPayload.push({id: item.id, phase: item.phase});
        }
      })
      if(rejectedPayload.length)
        this.apiService.updateNotifications(rejectedPayload).subscribe((res: any) => console.log(res))
      this.candidateList = this.rejectedList;
    }
    else if(this.currentTabIndex === 3) this.candidateList = this.pendingList;

    this.candidateList.sort((a: any,b: any) => new Date(b.update_time).getTime() - new Date(a.update_time).getTime() );

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
    const file: File =  event.target.files[0];

    reader.onload = (_event) => {
      this.msg = '';
      this.currentUserImage = reader.result;
    };
    const uploadData = new FormData();
    uploadData.append( 'pic', file);

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    let toasterMsg =  this.toastr;
    let apiService = this.apiService;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
        apiService.userInfo()
          .subscribe((res: any) =>{
            localStorage.setItem('currentUserInfo', JSON.stringify(res.data));
            apiService.currenUserInfo.next(res.data);
        })
        toasterMsg.success('Profile Picture Updated Succesfully');
        let el = document.getElementById("closeBtn") as HTMLButtonElement;
        el.click();
      }
    });

    xhr.open("POST", "http://54.208.4.29:8000/user/update-user-picture/");
    xhr.setRequestHeader("Authorization", this.token);

    xhr.send(uploadData);
    let curUserData = JSON.parse(localStorage.getItem('currentUserInfo') || '');
    this.currentUserImage = curUserData.pic ? "http://54.208.4.29:8080/" + curUserData.pic : "../../assets/Images/image_icon.svg";
  }

  onWriteReviewClick() {
    this.apiService.writeReviewAgainInfo.next({});
    localStorage.removeItem('candidInfo');
  }

  updateHelpfulCount(val: string, candidate: any) {
    let payload = {
      id: candidate.id,
      phase: candidate.phase,
      helpful: false,
      nothelpful: false

    }
    if(val == 'helpful') {
      payload.helpful = true;
      payload.nothelpful = false;
      candidate.helpfulSelected = 1;
      candidate.nothelpfulSelected = 0;
    }
    else if(val == 'not helpful') {
      payload.helpful = false;
      payload.nothelpful = true;
      candidate.helpfulSelected = 0;
      candidate.nothelpfulSelected = 1;
    }
    this.apiService.viewhelpful(payload).subscribe((res) => {
      this.approvedList.filter((approvedItem: any)=> {
        let helpfulCountpayload = {
          id: approvedItem.id,
          phase:  approvedItem.phase
        }
        this.apiService.helpfullCount(helpfulCountpayload).
        subscribe( (res:any) =>{
          approvedItem.Helpful = res.Helpful;
          approvedItem.Not_Helpful = res.Not_Helpful;
        })
      })
      this.allReviewList.filter((reviewItem: any)=> {
        let helpfulpayload = {
          id: reviewItem.id,
          phase:  reviewItem.phase
        }
        this.apiService.helpfullCount(helpfulpayload).
        subscribe( (res:any) =>{
          reviewItem.Helpful = res.Helpful;
          reviewItem.Not_Helpful = res.Not_Helpful;
        })
      })
    })
  }
}
