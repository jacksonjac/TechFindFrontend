import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVideocallroomComponent } from './client-videocallroom.component';

describe('ClientVideocallroomComponent', () => {
  let component: ClientVideocallroomComponent;
  let fixture: ComponentFixture<ClientVideocallroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientVideocallroomComponent]
    });
    fixture = TestBed.createComponent(ClientVideocallroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
