import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianLoginComponent } from './technician-login.component';

describe('TechnicianLoginComponent', () => {
  let component: TechnicianLoginComponent;
  let fixture: ComponentFixture<TechnicianLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianLoginComponent]
    });
    fixture = TestBed.createComponent(TechnicianLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
