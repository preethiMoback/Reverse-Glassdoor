import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.scss']
})
export class DashboardpageComponent implements OnInit {
rate = 4;
url :any = '../../assets/Images/profile_img.svg';
msg = "";

 
candidateData = [
    {"name": "Manohar Kunireddi", "success":"Approved","rejected":"Rejected","pending":"Approval pending"},
    {"name": "Amit","rejected":"Rejected","success":"Approved","pending":"Approval pending"},
    {"name": "Puneet ","success":"Approved","rejected":"Rejected","pending":"Approval pending"},
    ]


    onSelectFile(event: any) { 
      if(!event.target.files[0] || event.target.files[0].length == 0) {
        this.msg = 'You must select an image';
        return;
      }
      
      var mimeType = event.target.files[0].type;
      
      if (mimeType.match(/image\/*/) == null) {
        this.msg = "Only images are supported";
        return;
      }
      
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      
      reader.onload = (_event) => {
        this.msg = "";
        this.url = reader.result; 
      }
    }

  constructor() { }

  ngOnInit(): void {
  }

}
