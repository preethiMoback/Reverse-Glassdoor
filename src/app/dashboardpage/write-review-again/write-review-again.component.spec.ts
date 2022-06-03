import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReviewAgainComponent } from './write-review-again.component';

describe('WriteReviewAgainComponent', () => {
  let component: WriteReviewAgainComponent;
  let fixture: ComponentFixture<WriteReviewAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteReviewAgainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteReviewAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
