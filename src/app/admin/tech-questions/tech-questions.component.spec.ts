import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechQuestionsComponent } from './tech-questions.component';

describe('TechQuestionsComponent', () => {
  let component: TechQuestionsComponent;
  let fixture: ComponentFixture<TechQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechQuestionsComponent]
    });
    fixture = TestBed.createComponent(TechQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
