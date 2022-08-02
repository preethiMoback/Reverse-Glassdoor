import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormDataService } from 'src/app/dashboardpage/advanced-search/form-data.service';

@Component({
  selector: 'app-searchresultfromhome',
  templateUrl: './searchresultfromhome.component.html',
  styleUrls: ['./searchresultfromhome.component.scss']
})
export class SearchresultfromhomeComponent implements OnInit {

  data = this.formData.getData();        


  constructor(private formData:FormDataService,
    private ngxLoader: NgxUiLoaderService,
    private http: HttpClient,
    private router: Router) { }
 
  ngOnInit(): void {
    this.ngxLoader.startLoader('loader-01');
    this.data = this.data.split(/[\s,]+/).join().replace(/^,|,$/g, '');
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });
  }

  navigateToLogin() {
    this.router.navigate([''], {
      state: {step: 1, type: 'login'}
    });
  }

}
