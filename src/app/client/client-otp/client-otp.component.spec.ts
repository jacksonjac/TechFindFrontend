import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOtpComponent } from './client-otp.component';

describe('ClientOtpComponent', () => {
  let component: ClientOtpComponent;
  let fixture: ComponentFixture<ClientOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientOtpComponent]
    });
    fixture = TestBed.createComponent(ClientOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
