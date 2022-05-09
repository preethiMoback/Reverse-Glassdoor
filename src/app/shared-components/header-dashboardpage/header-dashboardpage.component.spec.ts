import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashboardpageComponent } from './header-dashboardpage.component';

describe('HeaderDashboardpageComponent', () => {
  let component: HeaderDashboardpageComponent;
  let fixture: ComponentFixture<HeaderDashboardpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderDashboardpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDashboardpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
