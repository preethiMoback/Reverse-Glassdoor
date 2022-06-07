import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from './form-data.service';


@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {


  registerForm!: FormGroup;
  submitted = false;
  name:string ='';
  email:any;
  phoneNumber:any;
  primaryskill:any;
  companyName:any;
  details: any;



  constructor(private formBuilder: FormBuilder,
              private router: Router, 
              private formData :FormDataService) { }

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
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (!this.registerForm.valid) {
      this.submitted = false;
      return;
    } 
    else{
      this.router.navigate(['/searchresult']);
      this.formData.setData( this.details = 
        (this.registerForm.get('name')?.value)
        + "," +
        (this.registerForm.get('email')?.value)
        + "," + 
        (this.registerForm.get('phoneNumber')?.value)
        + "," +  
        ( this.registerForm.get('primaryskill')?.value) 
        + "," +
        (this.registerForm.get('companyName')?.value)
      )    
              ;
        }
  }
 
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}


