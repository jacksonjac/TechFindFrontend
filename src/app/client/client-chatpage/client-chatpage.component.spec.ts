import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientChatpageComponent } from './client-chatpage.component';

describe('ClientChatpageComponent', () => {
  let component: ClientChatpageComponent;
  let fixture: ComponentFixture<ClientChatpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientChatpageComponent]
    });
    fixture = TestBed.createComponent(ClientChatpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
