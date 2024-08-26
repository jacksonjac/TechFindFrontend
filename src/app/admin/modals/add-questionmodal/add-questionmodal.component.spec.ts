import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionmodalComponent } from './add-questionmodal.component';

describe('AddQuestionmodalComponent', () => {
  let component: AddQuestionmodalComponent;
  let fixture: ComponentFixture<AddQuestionmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionmodalComponent]
    });
    fixture = TestBed.createComponent(AddQuestionmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
