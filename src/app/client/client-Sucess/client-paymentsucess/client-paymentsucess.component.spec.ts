import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentsucessComponent } from './client-paymentsucess.component';

describe('ClientPaymentsucessComponent', () => {
  let component: ClientPaymentsucessComponent;
  let fixture: ComponentFixture<ClientPaymentsucessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientPaymentsucessComponent]
    });
    fixture = TestBed.createComponent(ClientPaymentsucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
