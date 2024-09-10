import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassBlockModalComponent } from './manage-class-block-modal.component';

describe('ManageClassBlockModalComponent', () => {
  let component: ManageClassBlockModalComponent;
  let fixture: ComponentFixture<ManageClassBlockModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClassBlockModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageClassBlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
