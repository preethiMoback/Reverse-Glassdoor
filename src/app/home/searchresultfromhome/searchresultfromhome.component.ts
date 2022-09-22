import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Apiservice } from './../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-searchresultfromhome',
  templateUrl: './searchresultfromhome.component.html',
  styleUrls: ['./searchresultfromhome.component.scss']
})
export class SearchresultfromhomeComponent implements OnInit {

  data: any = localStorage.getItem('searchValue');
  candidateNotFound: boolean = false;
  candidateList: any = [];

  constructor(private apiService: Apiservice,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router) { }
 
  ngOnInit(): void {
    this.ngxLoader.startLoader('loader-01');
    this.ngxLoader.stopLoader('loader-01');
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });
    
    let payload = {
      "first_name": "",
      "middle_name": "",
      "last_name": "",
      "user_id": null
    }
    let names: any = [];
    names = this.data.split(" ");
    payload.first_name = names[0];
    if(names.length === 2) {
      payload.last_name = names[1]
    }
    else if(names.length > 2) {
      payload.middle_name = names[1];
      names.splice(0,2);
      payload.last_name = names.join(" ");
    }
    
    this.apiService.candidateAdvanceSearch(payload).subscribe(
      (res: any) => {
        if(res.data.length === 0) {
          this.candidateNotFound = true;
        }
        else {
          this.candidateNotFound = false;
          this.candidateList = res.data;
        }
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    )
  }

  navigateToLogin() {
    this.router.navigate([''], {
      state: {step: 1, type: 'login'}
    });
  }

}
