import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewRejectComponent } from './view-review-reject.component';

describe('ViewReviewRejectComponent', () => {
  let component: ViewReviewRejectComponent;
  let fixture: ComponentFixture<ViewReviewRejectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReviewRejectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReviewRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
