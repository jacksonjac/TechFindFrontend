import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingscheduleComponent } from './meetingschedule.component';

describe('MeetingscheduleComponent', () => {
  let component: MeetingscheduleComponent;
  let fixture: ComponentFixture<MeetingscheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingscheduleComponent]
    });
    fixture = TestBed.createComponent(MeetingscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
