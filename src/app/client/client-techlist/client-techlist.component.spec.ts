import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTechlistComponent } from './client-techlist.component';

describe('ClientTechlistComponent', () => {
  let component: ClientTechlistComponent;
  let fixture: ComponentFixture<ClientTechlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTechlistComponent]
    });
    fixture = TestBed.createComponent(ClientTechlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
