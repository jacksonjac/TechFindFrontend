import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianlistComponent } from './technicianlist.component';

describe('TechnicianlistComponent', () => {
  let component: TechnicianlistComponent;
  let fixture: ComponentFixture<TechnicianlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicianlistComponent]
    });
    fixture = TestBed.createComponent(TechnicianlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
