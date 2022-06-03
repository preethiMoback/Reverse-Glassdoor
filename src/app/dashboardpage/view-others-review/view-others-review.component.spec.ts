import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOthersReviewComponent } from './view-others-review.component';

describe('ViewOthersReviewComponent', () => {
  let component: ViewOthersReviewComponent;
  let fixture: ComponentFixture<ViewOthersReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOthersReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOthersReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
