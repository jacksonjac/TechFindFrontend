import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechAddslotComponent } from './tech-addslot.component';

describe('TechAddslotComponent', () => {
  let component: TechAddslotComponent;
  let fixture: ComponentFixture<TechAddslotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechAddslotComponent]
    });
    fixture = TestBed.createComponent(TechAddslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
