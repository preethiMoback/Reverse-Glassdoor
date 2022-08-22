import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apiservice } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidate-review',
  templateUrl: './candidate-review.component.html',
  styleUrls: ['./candidate-review.component.scss']
})
export class CandidateReviewComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  max: number = 5;
  // value: number = 5;
  //value!: Observable<number>;
  // registrationForm!: any;
  feedbackType: string = 'Positive';
  viewReviewData: any = {};
  hideTandC: boolean = false;
  reviewId: any;
  reviewPhase: any;
  countryCodeList: any;

  constructor(private formBuilder: FormBuilder, private apiService: Apiservice, private toaster: ToastrService, private router: Router) { }
//   ngOnInit() {
//     this.registerForm = this.formBuilder.group({
//         name: ['', Validators.required],
//         lastName: ['', Validators.required],
//         companyName:['', Validators.required],
//         primaryskill:['', Validators.required],
//         countrycode:['',[Validators.required,Validators.pattern('/^(\+?\d{1,3}|\d{1,4})$/')]],
//         phoneNumber: ['', [
//             Validators.required,
//             Validators.minLength(8),
//             Validators.maxLength(12),
//             Validators.pattern('^[0-9]*$')]],
//         companyWebsite:['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
//         message:['', Validators.required],
//         acceptTerms: [false, Validators.requiredTrue],
//         rating: [3],
//         gender: ['male', [Validators.required]],
//         email: ['', [
//             Validators.required,
//             Validators.minLength(5),
//             Validators.maxLength(80),
//             Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
//           ]],
//     });

    
// }

// get f() { return this.registerForm.controls; }
// get myForm() {
//   return this.registrationForm.get('gender');
// }
// onSubmit() {
//     this.submitted = true;
//     if (this.registerForm.invalid) {
//         return;
//     }
//     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
// }
// onReset() {
//       this.submitted = false;
//       this.registerForm.reset();
//   }

ngOnInit() {
  this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("(^[A-Za-z]{3,16})([ ]{1,1})([A-Za-z]{1,16})([ ]{0,1})?([A-Za-z]{0,16})?([ ]{0,1})?([A-Za-z]{0,16})")]],
      // lastName: ['', Validators.required],
      companyName:['', Validators.required],
      primaryskill:['', Validators.required],
      countrycode:['', Validators.required],//[Validators.required,Validators.pattern('/^(\+?\d{1,3}|\d{1,4})$/')]],
      rating: [3],
      status: ['', [Validators.required]],
      feedback:['', Validators.required],
      phoneNumber: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]*$')]],
      // companyWebsite:['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      // message:['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
      email: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ]],
  });

  this.apiService.writeReviewAgainInfo.subscribe((res) => {
    if(Object.keys(res).length === 0) {
      res = JSON.parse(localStorage.getItem("candidInfo") || '');
    } else {
      localStorage.setItem("candidInfo", JSON.stringify(res));
    }
    console.log(res);
    if(res?.status) {
      let el = document.getElementById('toggleSwitch') as HTMLInputElement;

      this.registerForm.get('name')?.setValue(res.first_name + ` ${res.middle_name}` + ` ${res.last_name}`);
      this.registerForm.get('companyName')?.setValue(res.current_org);
      this.registerForm.get('email')?.setValue(res.email);
      this.registerForm.get('countrycode')?.setValue(res.country_code);
      this.registerForm.get('phoneNumber')?.setValue(res.phone_number);
      this.registerForm.get('primaryskill')?.setValue(res.primary_skill);
      this.registerForm.get('status')?.setValue(res.phase);
      this.registerForm.get('rating')?.setValue(res.rating.length);
      if(res.feedback_type === 'Positive') {
        el.checked = false;
        this.onToggleStatus();
      }
      else {
        el.checked = true;
        this.onToggleStatus();
      }
      this.registerForm.get('feedback')?.setValue(res.feedback);
      this.registerForm.get('acceptTerms')?.setValue(true);

      this.registerForm.get('name')?.disable();
      this.registerForm.get('companyName')?.disable();
      this.registerForm.get('email')?.disable();
      this.registerForm.get('countrycode')?.disable();
      this.registerForm.get('phoneNumber')?.disable();
      this.registerForm.get('primaryskill')?.disable();
      this.registerForm.get('status')?.disable();

      this.reviewId = res.id;
      this.reviewPhase = res.phase;
      this.hideTandC = true;
    }
    else {
      this.registerForm.get('name')?.setValue(res.candidate_first_name + ` ${res.candidate_middle_name}` + ` ${res.candidate_last_name}`);
      this.registerForm.get('primaryskill')?.setValue(res?.["primary skill"]);
    }
  })

  this.countryCodeList = JSON.parse(localStorage.getItem('countryCodeList') || '');

}
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    }
    else{
      let ratingstring = '';
      let ratvalue = this.registerForm.value.rating;
      while(ratvalue--){
        ratingstring += "*";
      }

      if(!this.hideTandC) {
        let names = this.registerForm.value.name.split(" ");
        // let phase = this.registerForm.value.radio1? 'Interview' : this.registerForm.value.radio2? 'Offer': 'Onboarding';
        
        let payload = {
          first_name: this.registerForm.value.name.split(" ")[0],
          middle_name: '',
          last_name: this.registerForm.value.name.split(" ")[names.length - 1],
          country_code: this.registerForm.value.countrycode.toString(),
          mobile_num: this.registerForm.value.phoneNumber,
          email_id: this.registerForm.value.email,
          current_organisation_name: this.registerForm.value.companyName,
          phase: this.registerForm.value.status,
          feedback: this.registerForm.value.feedback,
          feedback_type: this.feedbackType,
          submission_status: "pending approval",
          justification_for_rejection: "---",
          rating: ratingstring,
          primary_skill: this.registerForm.value.primaryskill,
        }
        console.log(payload);
        this.apiService.candidateReview(payload)
        .subscribe(res =>{
          this.toaster.success('', 'Submit Candidate Review Successfully!');
          this.router.navigate(['/dashboardpage']);
        })
      }

      else {
        let payload = {
          id: this.reviewId,
          phase: this.reviewPhase,
          feedback: this.registerForm.value.feedback,
          feedback_type: this.feedbackType,
          rating: ratingstring
        }
        console.log(payload);
        this.apiService.updateReview(payload).subscribe((res) => {
          this.toaster.success('', 'Update Candidate Review Successfully!');
          this.router.navigate(['/dashboardpage']);
        })
      }

    }
}

onToggleStatus() {
  let el = document.getElementById('toggleSwitch') as HTMLInputElement;
  if(el.checked === false) this.feedbackType = 'Positive';
  else this.feedbackType = 'Negative';
}

// changeStatus(status: string){
//   console.log(status);
//   this.feedbackType = status;

// }



  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
