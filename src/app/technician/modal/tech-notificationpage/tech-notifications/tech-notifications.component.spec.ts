import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechNotificationsComponent } from './tech-notifications.component';

describe('TechNotificationsComponent', () => {
  let component: TechNotificationsComponent;
  let fixture: ComponentFixture<TechNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechNotificationsComponent]
    });
    fixture = TestBed.createComponent(TechNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
