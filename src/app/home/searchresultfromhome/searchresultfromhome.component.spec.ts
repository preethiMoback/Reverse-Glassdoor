import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultfromhomeComponent } from './searchresultfromhome.component';

describe('SearchresultfromhomeComponent', () => {
  let component: SearchresultfromhomeComponent;
  let fixture: ComponentFixture<SearchresultfromhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchresultfromhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultfromhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
