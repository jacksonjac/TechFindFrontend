import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTechProfileComponent } from './client-tech-profile.component';

describe('ClientTechProfileComponent', () => {
  let component: ClientTechProfileComponent;
  let fixture: ComponentFixture<ClientTechProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTechProfileComponent]
    });
    fixture = TestBed.createComponent(ClientTechProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
