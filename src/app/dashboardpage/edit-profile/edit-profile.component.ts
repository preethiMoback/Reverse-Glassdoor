import { ToastrService } from 'ngx-toastr';
import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  url :any = '../../assets/Images/profile_img.svg';
  submitted = false;
  registerForm!: FormGroup;
  msg = "";
  userData = {
    name: 'Mahesh Rudra Badaballa',
    email: 'maheshbadaballa@bighaat.com',
    companyName: 'Bighaat Pvt Ltd',
    phoneNumber: +9170110417
  }
  

  constructor(private formBuilder: FormBuilder, 
    private apiService: Apiservice,
    private toastr: ToastrService
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
    uploadData.append( 'pic', 'Test.jpg');
    let payload = {
      pic: 'test.jpg',
      xyz: "testing"
    }
    // uploadData.append('pic', file);
    
    this.apiService.uploadNewPhoto(payload)
    .subscribe(res =>{
        console.log(res);
    })
  }


  public delete(){
    this.apiService.RemovePhoto()
    .subscribe(res =>{
      console.log(res);
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
      name: ['', Validators.required],
      companyName:['', Validators.required],
      phoneNumber: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$')]],
      email: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]],
    });

    this.setData()

    
  }

  setData(){
    let curUserData = JSON.parse(localStorage.getItem('currentUserInfo') || '')
    this.userData.name = curUserData.first_name + " " + curUserData.middle_name + " " + curUserData.last_name;
    this.userData.companyName = curUserData.current_org;
    this.userData.email = curUserData.current_org_mail_id;
    this.userData.phoneNumber = curUserData.mobile_num;
    this.registerForm.get('name')!.setValue(this.userData.name);
    this.registerForm.get('email')!.setValue(this.userData.email);
    this.registerForm.get('companyName')!.setValue(this.userData.companyName);
    this.registerForm.get('phoneNumber')!.setValue(this.userData.phoneNumber);

  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    let name = this.registerForm.get('name')?.value.split(" ");
    let payload = {
      first_name: name[0],
      middle_name: name.length > 2? name[1]: '',
      last_name: name.length > 1? name[name.length - 1]: '',
      mobilenum: this.registerForm.get('phoneNumber')?.value,
      current_org_mailid: this.registerForm.get('email')?.value,
      current_org: this.registerForm.get('companyName')?.value,
    }
    console.log(payload);
    this.apiService.updateUserInfo(payload)
      .subscribe(res =>{
        console.log(res);
        this.apiService.userInfo()
          .subscribe((res: any) =>{
            localStorage.setItem('currentUserInfo', JSON.stringify(res.data));
            this.apiService.currenUserInfo.next(res.data);
        })
      })
  }


}
