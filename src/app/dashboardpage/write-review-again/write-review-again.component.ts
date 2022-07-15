import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apiservice } from 'src/app/services/api.service';

@Component({
  selector: 'app-write-review-again',
  templateUrl: './write-review-again.component.html',
  styleUrls: ['./write-review-again.component.scss']
})
export class WriteReviewAgainComponent implements OnInit {
  
  registerForm!: FormGroup;
  submitted = false;
  max: number = 5;
  value: number = 5;
  userData = {
    name: 'Mahesh Rudra Badaballa',
    email: 'maheshbadaballa@bighaat.com',
    companyName: 'Bighaat Pvt Ltd',
    phoneNumber: +9170110417,
    primaryskill: 'Figma'
  }
  
  constructor(private formBuilder: FormBuilder,
    private apiService: Apiservice) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName:['', Validators.required],
      primaryskill:['', Validators.required],
      phoneNumber: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]*$')]],
      companyWebsite:['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      message:['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      email: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]],
  });

  this.setData()
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  setData(){

    this.registerForm.get('name')!.setValue(this.userData.name);
    this.registerForm.get('email')!.setValue(this.userData.email);
    this.registerForm.get('companyName')!.setValue(this.userData.companyName);
    this.registerForm.get('phoneNumber')!.setValue(this.userData.phoneNumber);  

}


}
