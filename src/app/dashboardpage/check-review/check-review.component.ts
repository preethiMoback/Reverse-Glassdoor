import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from './../../services/api.service';

@Component({
  selector: 'app-check-review',
  templateUrl: './check-review.component.html',
  styleUrls: ['./check-review.component.scss']
})
export class CheckReviewComponent implements OnInit {

  constructor(  private apiService: Apiservice,
    private router: Router,) { }

  ngOnInit(): void {
  }

  viewhelpful(item: any, phase: string){
    let payload = {
      id: item.id,
      phase:  phase
    }
    this.apiService.helpfullCount(payload).
    subscribe( (res:any) =>{
      console.log(res);
      item.Helpful = res.Helpful;
      item.Not_Helpful = res.Not_Helpful;
      // this.prepareData(item);
    })
  }
}
