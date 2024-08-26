import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallpageComponent } from './videocallpage.component';

describe('VideocallpageComponent', () => {
  let component: VideocallpageComponent;
  let fixture: ComponentFixture<VideocallpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideocallpageComponent]
    });
    fixture = TestBed.createComponent(VideocallpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
