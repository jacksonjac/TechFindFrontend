import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechHomepageComponent } from './tech-homepage.component';

describe('TechHomepageComponent', () => {
  let component: TechHomepageComponent;
  let fixture: ComponentFixture<TechHomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechHomepageComponent]
    });
    fixture = TestBed.createComponent(TechHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
