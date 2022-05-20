import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-advanced-search-results',
  templateUrl: './advanced-search-results.component.html',
  styleUrls: ['./advanced-search-results.component.scss']
})
export class AdvancedSearchResultsComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  name: string = "";


  constructor(private formBuilder: FormBuilder) { }


  

  ngOnInit() {
    this.createForm();
  }

  createForm() { 
    this.registerForm= this.formBuilder.group({
        name: [''],
        email: ['', [
                  Validators.minLength(5),
                  Validators.maxLength(80),
                  Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
                ]],
        phoneNumber: [''],
        primaryskill: [''],
        companyName: ['']
      }, { validators: this.atLeastOne(Validators.required, ["name", "email", "phoneNumber", "primaryskill", "companyName"]) })
  } 

  atLeastOne(validator: ValidatorFn, controls: string[] = []): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control) return null;
        const formGroup = control as FormGroup;
        return (formGroup && controls.some(k => !validator(formGroup.controls[k]))) ? null : {
          atLeastOne: true,
        };
      }
    }


  
  
  
  
  
  
  // {
  //   this.registerForm = this.formBuilder.group({
  //     name: [''],
  //     lastName: [''],
  //     companyName:[''],
  //     primaryskill:[''],
  //     phoneNumber: ['', [
  //         Validators.required,
  //         Validators.minLength(8),
  //         Validators.maxLength(12),
  //         Validators.pattern('^[0-9]*$')]],
  //     companyWebsite:['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
  //     message:[''],
  //     acceptTerms: [false, Validators.requiredTrue],
  //     email: ['', [
  //         Validators.minLength(5),
  //         Validators.maxLength(80),
  //         Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
  //       ]],
  // }, { validator: this.atLeastOne(Validators.required) });
  // }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

  if (!this.registerForm.valid) {
    this.submitted = false;
    return;
  }else{
    var name = this.registerForm.get('name')?.value;
    var email= this.registerForm.get('email')?.value;
    var phoneNumber = this.registerForm.get('phoneNumber')?.value;
    var primaryskill = this.registerForm.get('primaryskill')?.value;
    var companyName = this.registerForm.get('companyName')?.value;
    var details = name + ", "+email+", "+ phoneNumber + ", "+ primaryskill +", "+companyName; 
    console.log(details);
    return details;
  }

};


  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

}

