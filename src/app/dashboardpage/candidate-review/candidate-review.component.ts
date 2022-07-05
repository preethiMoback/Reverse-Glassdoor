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
  registrationForm!: any;
  feedbackType: string = 'Positive';

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
      name: ['', Validators.required],
      // lastName: ['', Validators.required],
      companyName:['', Validators.required],
      primaryskill:['', Validators.required],
      countrycode:['',[]],//[Validators.required,Validators.pattern('/^(\+?\d{1,3}|\d{1,4})$/')]],
      rating: [3],
      status: ['', [Validators.required]],
      feedback:['', Validators.required],
      phoneNumber: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
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
}
get f() { return this.registerForm.controls; }

onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
        return;
    }
    else{
      let names = this.registerForm.value.name.split(" ");
      let phase = this.registerForm.value.radio1? 'Interview' : this.registerForm.value.radio2? 'Offer': 'Onboarding';
      let ratingstring = '';
      let ratvalue = this.registerForm.value.rating;
      while(ratvalue--){
        ratingstring += "*";
      }
      let payload = {
        first_name: this.registerForm.value.name.split(" ")[0],
        middle_name: '',
        last_name: this.registerForm.value.name.split(" ")[names.length - 1],
        mobile_num: this.registerForm.value.countrycode.split("+")[1] +  this.registerForm.value.phoneNumber,
        email_id: this.registerForm.value.email,
        current_organisation_name: this.registerForm.value.companyName,
        phase: phase,
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
}

changeStatus(status: string){
  console.log(status);
  this.feedbackType = status;

}



  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
