import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  details : any; 

  constructor( ) { }

  setData(details: any){
    this.details = details;
  }

  getData(){
    let temp = this.details;
    return temp;
  }
  
  
}
