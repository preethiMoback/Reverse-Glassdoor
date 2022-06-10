import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../dashboardpage/advanced-search/form-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  isOpenpopup: boolean = false ;
  step = -1;
  details: any;
  
 
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private formData :FormDataService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      password:['', Validators.required],
      otp:['', Validators.required],
      organisationname:['', Validators.required],
      createpassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      companyName:['', Validators.required],
      productdemo:['', Validators.required],
      phoneNumber: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$')]],
      companyWebsite:['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      message:['', Validators.required],
      email: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]],
  });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    else{
      this.router.navigate(['/searchresultfromhome']);
      this.formData.setData( this.details = 
       (this.registerForm.get('email')?.value)
      );
    }
}

// onClickOpenpopup() {
//   //  this.step=1;

//   //this.isOpenpopup = ! this.isOpenpopup;
//   //return this.isOpenpopup;
// }
changeStep(stepVal:number){
  this.step = stepVal;
}
}
