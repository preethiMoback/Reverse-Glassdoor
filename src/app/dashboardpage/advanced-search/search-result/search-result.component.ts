import { Apiservice } from './../../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  data = this.formData.getData();   
  filterList: any[] = [];    
  candidateNotFound = false;

  constructor(private formData:FormDataService,
    private apiService: Apiservice,
    private ngxLoader: NgxUiLoaderService, 
    private http: HttpClient) { }

  ngOnInit(): void {

    this.ngxLoader.startLoader('loader-01'); 
    this.http.get(`https://api.npmjs.org/downloads/range/last-year/ngx-ui-loader`).subscribe((res: any) => {
      console.log(res);
      this.ngxLoader.stopLoader('loader-01');
    });

    this.apiService.filteredResult.subscribe((res: any)=>{
      console.log(res);
      this.filterList = res;
      if (res.length === 0) {
        this.candidateNotFound = true;
        } else {
         this.candidateNotFound = false;
        }
    })
  }



}
