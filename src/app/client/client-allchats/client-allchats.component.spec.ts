import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAllchatsComponent } from './client-allchats.component';

describe('ClientAllchatsComponent', () => {
  let component: ClientAllchatsComponent;
  let fixture: ComponentFixture<ClientAllchatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAllchatsComponent]
    });
    fixture = TestBed.createComponent(ClientAllchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
