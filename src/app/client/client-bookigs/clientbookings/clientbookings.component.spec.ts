import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientbookingsComponent } from './clientbookings.component';

describe('ClientbookingsComponent', () => {
  let component: ClientbookingsComponent;
  let fixture: ComponentFixture<ClientbookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientbookingsComponent]
    });
    fixture = TestBed.createComponent(ClientbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
