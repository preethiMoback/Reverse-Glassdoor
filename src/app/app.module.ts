import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
import { WriteReviewComponent } from './dashboardpage/write-review/write-review.component';
import { CheckReviewComponent } from './dashboardpage/check-review/check-review.component';
import { ViewReviewComponent } from './dashboardpage/view-review/view-review.component';
import { ViewAllComponent } from './dashboardpage/view-all/view-all.component';
import { DashboardReviewComponent } from './dashboardpage/dashboard-review/dashboard-review.component';
import { SearchResultComponent } from './dashboardpage/advanced-search/search-result/search-result.component';
import { ViewOthersReviewComponent } from './dashboardpage/view-others-review/view-others-review.component';
import { EditProfileComponent } from './dashboardpage/edit-profile/edit-profile.component';
import { WriteReviewAgainComponent } from './dashboardpage/write-review-again/write-review-again.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { SearchresultfromhomeComponent } from './home/searchresultfromhome/searchresultfromhome.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { ViewReviewRejectComponent } from './dashboardpage/view-review-reject/view-review-reject.component';
import { ViewReviewPendingComponent } from './dashboardpage/view-review-pending/view-review-pending.component';

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
    WriteReviewComponent,
    CheckReviewComponent,
    ViewReviewComponent,
    ViewAllComponent,
    DashboardReviewComponent,
    SearchResultComponent,
    ViewOthersReviewComponent,
    EditProfileComponent,
    WriteReviewAgainComponent,
    SearchresultfromhomeComponent,
    ModeratorComponent,
    ViewReviewRejectComponent,
    ViewReviewPendingComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RatingModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    NgxInputStarRatingModule,
    NgxUiLoaderModule.forRoot({
  "fgsColor": "#62177C",
  "fgsPosition": "center-center",
  "fgsSize": 200,
  "fgsType": "fading-circle",
  "overlayColor": "#F4F4F4",
  "hasProgressBar": false,
  "minTime": 400,
  "text": "Searching Please Wait",
  "textColor": "#000000",
  "textPosition": "center-center",
      }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
