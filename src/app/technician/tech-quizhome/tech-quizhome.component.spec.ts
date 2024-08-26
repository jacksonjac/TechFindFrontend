import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechQuizhomeComponent } from './tech-quizhome.component';

describe('TechQuizhomeComponent', () => {
  let component: TechQuizhomeComponent;
  let fixture: ComponentFixture<TechQuizhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechQuizhomeComponent]
    });
    fixture = TestBed.createComponent(TechQuizhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
