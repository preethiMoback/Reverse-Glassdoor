import { Apiservice } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from '../dashboardpage/advanced-search/form-data.service';
import { ToastrService } from 'ngx-toastr';

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
  login: boolean =  false;
  signup: boolean = false;
  UserNotExist: boolean = false;
  isEmailVerified: boolean = false;
  message: string = '';
  show: boolean = false;
  timeLeft: number = 120;
  interval:any;
  timerOn = true;
  
 
  constructor(private formBuilder: FormBuilder,
    private router: Router, 
    private apiService: Apiservice,
    private toastr: ToastrService,
    private formData :FormDataService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      password:['', Validators.required],
      otp:['', Validators.required],
      organisationname:['', Validators.required],
      createpassword: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
      confirmpassword: [{value: '', disabled: true}, Validators.required],
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
    console.log(this.step); 
    if(this.step == 1 && this.login){ // log in
      let payload = {
        username: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
      this.apiService.loginUser(payload).subscribe(
        (res: any) =>{
          this.router.navigate(['/dashboardpage']);
          this.formData.setData( this.details = 
            (this.registerForm.get('email')?.value)
          );
          
          localStorage.setItem('token', res.jwt);
          this.UserNotExist = false;
          this.toastr.success('', 'Loggedin Successfully!');
          this.apiService.userInfo()
          .subscribe((res: any) =>{
            localStorage.setItem('currentUserInfo', JSON.stringify(res.data));
            this.apiService.currenUserInfo.next(res.data);
          })
        },
        (err) => {
          console.log(err);
          this.UserNotExist = true;
        }
      );
    }
    else if(this.step == 2 && this.login) // forget Password
    {
        let payload = {
          email: this.registerForm.value.email
        }

        this.apiService.changePassword(payload)
        .subscribe(
          (res: any) =>{
            this.changeStep('login',3);
            this.UserNotExist = false;
          },
          (err) => {
            console.log(err);
            this.UserNotExist = true;
            this.toastr.error('', 'User Not exist!');
          }
        );
    }
    else if(this.step == 3 && this.login){ //Otp Verification
      let payload = {
        email_id: this.registerForm.get('email')?.value,
        otp: this.registerForm.get('otp')?.value
      }
      this.apiService.otpValidate(payload)
      .subscribe(response => {
        this.toastr.success('', 'Email Verified Successfully!');
        this.makeEnable();
        this.changeStep('login',4);
      },(err =>{
        this.toastr.error('', 'Otp is not correct!');
      }))
    }
    else if(this.step == 4 && this.login){// reset Password
      let payload = {
          "email" : this.registerForm.value.email,
          "new_password" : this.registerForm.value.createpassword,
          "confirm_password" : this.registerForm.value.confirmpassword
      }
      this.apiService.resetPassword(payload)
      .subscribe((res: any)=>{
        this.toastr.success('', 'Changed Password Successfully!');
        this.changeStep('login',1);
      })
    }

    if(this.signup && this.step == 1){ // Sign up

      if(this.checkEmailVerif()){
        let payload = {
          email_id: this.registerForm.get('email')?.value
        }
        this.apiService.emailVerification(payload)
        .subscribe(response => {
          this.isEmailVerified = true;
          this.toastr.success('', 'Send Otp Successfully!');
          this.changeStep('signup',2);
        })
      }
      else if(this.passwordVerify()){
        let name = this.registerForm.value.name.split(" ");
        let payload = {
          first_name: name[0],
          middle_name: this.registerForm.value.middleName?this.registerForm.value.middleName: '',
          last_name: name.length > 1? name[1]: '',
          mobilenum: this.registerForm.value.phoneNumber.toString(),
          current_org: this.registerForm.value.companyName,
          current_org_mailid: this.registerForm.value.email,
          password: this.registerForm.value.confirmpassword,
          confirm_password: this.registerForm.value.confirmpassword,
          user_category: 'normal user'
        }

        this.apiService.registerUser(payload)
          .subscribe(response =>{
            this.toastr.success('', 'Register User Successfully!');
            this.changeStep('',-1);
          })
        // console.log(payload);
      }
    }
    else if(this.step == 2 && this.signup && this.f['otp'].valid){ //Otp Verification
      let payload = {
        email_id: this.registerForm.get('email')?.value,
        otp: this.registerForm.get('otp')?.value
      }
      this.apiService.otpValidate(payload)
      .subscribe(response => {
        this.isEmailVerified = true;
        this.makeEnable();
        this.toastr.success('', 'Email Verified Successfully!');

        console.log(this.registerForm);
        this.changeStep('signup',1);
      })
    }
}

checkEmailVerif(){
  return this.f['email'].valid && this.f['name'].valid && this.f['companyName'].valid && this.f['phoneNumber'].valid && !this.f['createpassword'].valid ;
}

passwordVerify(){
  return this.f['confirmpassword'].valid && this.f['createpassword'].valid ;
}



// onClickOpenpopup() {
//   //  this.step=1;

//   //this.isOpenpopup = ! this.isOpenpopup;
//   //return this.isOpenpopup;
// }
  changeStep(curval: string, stepVal:number){
    this.login = curval == 'login'? true:false;
    this.signup = curval == 'signup'? true:false;
    this.step = stepVal;
  }

  makeEnable(){
      this.registerForm.get('createpassword')?.enable();
      this.registerForm.get('confirmpassword')?.enable();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
      }
    },1000)
  }

}
