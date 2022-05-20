import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared-components/header/header.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { HeaderDashboardpageComponent } from './shared-components/header-dashboardpage/header-dashboardpage.component';
import { CandidateReviewComponent } from './dashboardpage/candidate-review/candidate-review.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { AdvancedSearchComponent } from './dashboardpage/advanced-search/advanced-search.component';
import { AdvancedSearchResultsComponent } from './dashboardpage/advanced-search/advanced-search-results/advanced-search-results.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardpageComponent,
    HeaderDashboardpageComponent,
    CandidateReviewComponent,
    AdvancedSearchComponent,
    AdvancedSearchResultsComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
