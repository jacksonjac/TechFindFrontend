import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientprofilepageComponent } from './clientprofilepage.component';

describe('ClientprofilepageComponent', () => {
  let component: ClientprofilepageComponent;
  let fixture: ComponentFixture<ClientprofilepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientprofilepageComponent]
    });
    fixture = TestBed.createComponent(ClientprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
