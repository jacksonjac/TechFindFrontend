import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechQuizpageComponent } from './tech-quizpage.component';

describe('TechQuizpageComponent', () => {
  let component: TechQuizpageComponent;
  let fixture: ComponentFixture<TechQuizpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechQuizpageComponent]
    });
    fixture = TestBed.createComponent(TechQuizpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
