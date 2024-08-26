import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianOtpComponent } from './technician-otp.component';

describe('TechnicianOtpComponent', () => {
  let component: TechnicianOtpComponent;
  let fixture: ComponentFixture<TechnicianOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianOtpComponent]
    });
    fixture = TestBed.createComponent(TechnicianOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
