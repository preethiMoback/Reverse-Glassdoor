import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewPendingComponent } from './view-review-pending.component';

describe('ViewReviewPendingComponent', () => {
  let component: ViewReviewPendingComponent;
  let fixture: ComponentFixture<ViewReviewPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReviewPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReviewPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
