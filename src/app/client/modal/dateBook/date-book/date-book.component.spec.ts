import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateBookComponent } from './date-book.component';

describe('DateBookComponent', () => {
  let component: DateBookComponent;
  let fixture: ComponentFixture<DateBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateBookComponent]
    });
    fixture = TestBed.createComponent(DateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
