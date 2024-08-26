import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianHomepageComponent } from './technician-homepage.component';

describe('TechnicianHomepageComponent', () => {
  let component: TechnicianHomepageComponent;
  let fixture: ComponentFixture<TechnicianHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianHomepageComponent]
    });
    fixture = TestBed.createComponent(TechnicianHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
