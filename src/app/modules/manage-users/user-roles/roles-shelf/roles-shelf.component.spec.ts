import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesShelfComponent } from './roles-shelf.component';

describe('RolesShelfComponent', () => {
  let component: RolesShelfComponent;
  let fixture: ComponentFixture<RolesShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesShelfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
