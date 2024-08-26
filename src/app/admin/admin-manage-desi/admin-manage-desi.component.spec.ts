import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageDesiComponent } from './admin-manage-desi.component';

describe('AdminManageDesiComponent', () => {
  let component: AdminManageDesiComponent;
  let fixture: ComponentFixture<AdminManageDesiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminManageDesiComponent]
    });
    fixture = TestBed.createComponent(AdminManageDesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
