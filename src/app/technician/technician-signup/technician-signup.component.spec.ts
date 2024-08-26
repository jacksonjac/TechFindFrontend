import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianSignupComponent } from './technician-signup.component';

describe('TechnicianSignupComponent', () => {
  let component: TechnicianSignupComponent;
  let fixture: ComponentFixture<TechnicianSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianSignupComponent]
    });
    fixture = TestBed.createComponent(TechnicianSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
