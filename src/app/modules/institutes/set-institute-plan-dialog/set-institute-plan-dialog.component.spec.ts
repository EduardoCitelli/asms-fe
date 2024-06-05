import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetInstitutePlanDialogComponent } from './set-institute-plan-dialog.component';

describe('SetInstitutePlanDialogComponent', () => {
  let component: SetInstitutePlanDialogComponent;
  let fixture: ComponentFixture<SetInstitutePlanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetInstitutePlanDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetInstitutePlanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
