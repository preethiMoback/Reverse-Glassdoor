import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//created component
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { HeaderDashboardpageComponent } from './shared-components/header-dashboardpage/header-dashboardpage.component';
import { CandidateReviewComponent } from './dashboardpage/candidate-review/candidate-review.component';
import { AdvancedSearchComponent } from './dashboardpage/advanced-search/advanced-search.component';
import { AdvancedSearchResultsComponent } from './dashboardpage/advanced-search/advanced-search-results/advanced-search-results.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'dashboardpage',  component: DashboardpageComponent },
  { path: 'mainpageheader',  component: HeaderDashboardpageComponent },
  { path: 'candidatereview',  component: CandidateReviewComponent },
  { path: 'advancedsearch',  component: AdvancedSearchComponent },
  { path: 'advancedsearchresults',  component: AdvancedSearchResultsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
