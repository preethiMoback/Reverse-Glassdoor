import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

// @Component({
//     selector: 'app-apiservice.ts',
//     templateUrl: './apiservice.ts.component.html',
//     styleUrls: ['./apiservice.ts.component.scss']
//   })
@Injectable({
    providedIn: 'root'
})

export class Apiservice {
    DeployedIP : string = "54.208.4.29";
    DeployedPort: string = "8000";
    token: string = localStorage.getItem('token') || '';
    currentUserName: string = localStorage.getItem('currentUserName') || '';
    currentUserEmail: string =  localStorage.getItem('currentUserEmail') || '';
    filteredResult: BehaviorSubject<any> = new BehaviorSubject({});
    currentReviewList: BehaviorSubject<any> = new BehaviorSubject({});
    currenUserInfo: BehaviorSubject<any> = new BehaviorSubject({});
    reviewCandidateInfo: BehaviorSubject<any> = new BehaviorSubject({});
    viewReviewDetails: BehaviorSubject<any> = new BehaviorSubject({});


    
    header: any = new HttpHeaders({
        "Content-Type": "application/json"
    });

    headers: any = new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': this.token
    })

    uploadHeader: any =  new HttpHeaders({
        "Content-Type": "multipart/form-data",
        "Authorization": this.token
    })


    commoOptions: any = { headers: this.header };
    commonOptions2: any = {headers: this.headers};
    commonOptions3: any = {headers: this.uploadHeader};

    

    constructor(private http: HttpClient
        ){
    }

    registerUser(payload: any): Observable<any>{
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/reg/`,payload,this.commoOptions);
    }

    loginUser(payload: any): Observable<any>{
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/login/`,payload,this.commoOptions);
    }

    resetPassword(payload: any): Observable<any>{
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/reset-password/`,payload,this.commonOptions2);
    }

    changePassword(payload: any): Observable<any>{
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/change-password/`,payload,this.commonOptions2);
    }

    candidateReview(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/feedback/`,payload,this.commonOptions2);
    }

    candidateFeedbackCount(){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/getfeedbackcount/`,{},this.commonOptions2);
    }

    candidateInfo(){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/getuserdetails/`,{},this.commonOptions2);
    }

    candidateAdvanceSearch(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/getcandidatedetails/`,payload,this.commonOptions2);
    }

    emailVerification(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/email_verify/`,payload,this.commoOptions);
    }

    otpValidate(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/otp_validate/`,payload,this.commoOptions);
    }

    userInfo(){
        return this.http.get(`http://${this.DeployedIP}:${this.DeployedPort}/user/get-details/`,this.commonOptions2);
    }

    updateUserInfo(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/update-user-profile/`,payload,this.commonOptions2);
    }

    uploadNewPhoto(payload: any){
        return this.http.post<any>(`http://${this.DeployedIP}:${this.DeployedPort}/user/update-user-picture/`,payload,this.commonOptions3);
    }

    RemovePhoto(){
        return this.http.get(`http://${this.DeployedIP}:${this.DeployedPort}/user/delete-user-picture/`,this.commonOptions2);
    }

    reviewcandidateInfo(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/getcandidateinfo/`,payload,this.commonOptions2);
    }

    helpfullCount(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/totalcount_helpful/`,payload,this.commonOptions2);
    }

    deactiveAccount(){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/deactivate/`,{},this.commonOptions2);
    }

    statusUpdateByMorderator(){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/update_status/`,{},this.commonOptions2);
    }

    viewReview(payload: any){
        return this.http.get(`http://${this.DeployedIP}:${this.DeployedPort}/user/ViewFeedback/?id=`+ payload.id + "&phase=" + payload.phase,this.commonOptions2);
    }

    changeHelpfull(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/edit/`,payload,this.commonOptions2);
    }

    viewhelpful(payload: any){
        return this.http.post(`http://${this.DeployedIP}:${this.DeployedPort}/user/helpful_nothelpful/`,payload,this.commonOptions2);
    }

}