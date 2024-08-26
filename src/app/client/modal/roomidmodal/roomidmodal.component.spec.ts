import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomidmodalComponent } from './roomidmodal.component';

describe('RoomidmodalComponent', () => {
  let component: RoomidmodalComponent;
  let fixture: ComponentFixture<RoomidmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomidmodalComponent]
    });
    fixture = TestBed.createComponent(RoomidmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
