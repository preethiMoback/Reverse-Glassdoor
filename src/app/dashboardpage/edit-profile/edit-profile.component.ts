import { ToastrService } from 'ngx-toastr';
import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  url :any;
  submitted = false;
  resetPassword: boolean = false;
  registerForm!: FormGroup;
  changePasswordForm!: FormGroup;
  msg = "";
  token: string = localStorage.getItem('token') || '';
  userData = {
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    countryCode: ''
  }
  

  constructor(private formBuilder: FormBuilder, 
    private apiService: Apiservice,
    private toastr: ToastrService,
    private router: Router
    ) {
   
  }

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
    const file: File =  event.target.files[0];

    console.log(event);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
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
            toasterMsg.success('Profile Picture Updated Succesfully');
        })
      }
    });

    xhr.open("POST", "http://54.208.4.29:8000/user/update-user-picture/");
    xhr.setRequestHeader("Authorization", this.token);

    xhr.send(uploadData);

    let curUserData = JSON.parse(localStorage.getItem('currentUserInfo') || '');
    this.url = curUserData.pic ? "http://54.208.4.29:8080/" + curUserData.pic : "../../assets/Images/image_icon.svg";
  }


  public delete(){
    this.apiService.RemovePhoto()
    .subscribe(res =>{
      console.log(res);
      this.apiService.userInfo()
        .subscribe((res: any) =>{
          localStorage.setItem('currentUserInfo', JSON.stringify(res.data));
          this.apiService.currenUserInfo.next(res.data);
          this.toastr.success('Photo Removed Successfully!');
      })
      this.url = "../../assets/Images/image_icon.svg";
    })

  }

  deactivateAccount(){
    this.apiService.deactiveAccount()
      .subscribe(res =>{
        this.toastr.success('', 'Deactived The Account Successfully!');
      });
  }


  ngOnInit() : void{
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      companyName:[{value: '', disabled: true}, Validators.required],
      phoneNumber: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$')]],
      countryCode: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
      ]],
      email: [{value: '', disabled: true}, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]],
    });
    // this.changePasswordForm = this.formBuilder.group({
    //   oldPassword: ['', [Validators.required]],
    //   passwords: this.formBuilder.group({
    //     newPassword: ['', [Validators.required,Validators.minLength(8)]],
    //     confirmPassword: ['', [Validators.required]]
    //   }, {validators: this.checkPasswords})
    // });

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required,Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.setData()

    
  }

  // checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  //   let pass = group.get('newPassword')?.value;
  //   let confirmPass = group.get('confirmPassword')?.value
  
  //   return pass === confirmPass ? null : { notSame: true }
  // }

  setData(){
    let curUserData = JSON.parse(localStorage.getItem('currentUserInfo') || '');
    this.userData.name = curUserData.first_name + (curUserData.middle_name.length ? ` ${curUserData.middle_name} ` : '') + (curUserData.last_name.length ? ` ${curUserData.last_name}` : '');
    this.userData.companyName = curUserData.current_org;
    this.userData.email = curUserData.current_org_mail_id;
    this.userData.phoneNumber = curUserData.mobile_num;
    this.userData.countryCode = curUserData.country_code;
    this.url = curUserData.pic ? "http://54.208.4.29:8080/" + curUserData.pic : "../../assets/Images/image_icon.svg";
    this.registerForm.get('name')!.setValue(this.userData.name);
    this.registerForm.get('email')!.setValue(this.userData.email);
    this.registerForm.get('companyName')!.setValue(this.userData.companyName);
    this.registerForm.get('phoneNumber')!.setValue(this.userData.phoneNumber);
    this.registerForm.get('countryCode')!.setValue(this.userData.countryCode);
  }

  get f() { return this.registerForm.controls; }
  get cf() { return this.changePasswordForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let name = this.registerForm.get('name')?.value.split(" ");
    let payload = {
      first_name: name[0],
      middle_name: name.length > 2 ? name.slice(1,name.length-1).join(" ") : '',
      last_name: name.length >= 2 ? name[name.length - 1]: '',
      country_code: this.registerForm.get('countryCode')?.value,
      mobilenum: this.registerForm.get('phoneNumber')?.value,
      current_org_mailid: this.registerForm.get('email')?.value,
      current_org: this.registerForm.get('companyName')?.value,
    }
    this.apiService.updateUserInfo(payload)
      .subscribe(res =>{
        this.toastr.success('Your Profile has been successfully updated!')
        this.apiService.userInfo()
          .subscribe((res: any) =>{
            localStorage.setItem('currentUserInfo', JSON.stringify(res.data));
            this.apiService.currenUserInfo.next(res.data);
            this.setData();
            let el = document.getElementById("updateBtn") as HTMLButtonElement;
            el.disabled = true;
        })
      })
  }

  onResetPassword() {
    this.resetPassword = true;
    if(this.changePasswordForm.invalid || (this.changePasswordForm.get('newPassword')?.value !== this.changePasswordForm.get('confirmPassword')?.value)) {
      return;
    }
    let payload: any = {
      existing_password: this.changePasswordForm.get('oldPassword')?.value,
      new_password: this.changePasswordForm.get('newPassword')?.value,
      confirm_password: this.changePasswordForm.get('confirmPassword')?.value
    };
    this.apiService.changeUserPassword(payload).subscribe(res => {
      this.toastr.success('Password Changed Succesfully! Please Login Aagain');
      let el = document.getElementById("close") as HTMLElement;
      el.click();
      this.navigateToLogin();
    },
    (error) => {
      this.toastr.error(error.error.message);
    }
    )
  }

  navigateToLogin() {
    localStorage.clear();
    this.router.navigate([''], {
      state: {step: 1, type: 'login'}
    });
  }

  onValueChange() {
    let el = document.getElementById("updateBtn") as HTMLButtonElement;
    if(this.registerForm.get('name')?.value !== this.userData.name || this.registerForm.get('phoneNumber')?.value !== this.userData.phoneNumber || this.registerForm.get('countryCode')?.value !== this.userData.countryCode) {
      el.disabled = false;
    }
    else el.disabled = true;
  }


}
