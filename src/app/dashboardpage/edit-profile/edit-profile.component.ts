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
  

  constructor(private formBuilder: FormBuilder) {
   
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
    
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result; 
    }
  }
  public delete(){
      this.url = null;
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
      this.registerForm.get('name')!.setValue(this.userData.name)
      this.registerForm.get('email')!.setValue(this.userData.email);
      this.registerForm.get('companyName')!.setValue(this.userData.companyName);
      this.registerForm.get('phoneNumber')!.setValue(this.userData.phoneNumber);

  }

  get f() { return this.registerForm.controls; }


}
