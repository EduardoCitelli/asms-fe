import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignInstituteMemberMembershipComponent } from './assign-institute-member-membership.component';

describe('AssignInstituteMemberMembershipComponent', () => {
  let component: AssignInstituteMemberMembershipComponent;
  let fixture: ComponentFixture<AssignInstituteMemberMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignInstituteMemberMembershipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignInstituteMemberMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
