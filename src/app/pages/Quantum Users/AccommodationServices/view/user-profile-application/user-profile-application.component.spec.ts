import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileApplicationComponent } from './user-profile-application.component';

describe('UserProfileApplicationComponent', () => {
  let component: UserProfileApplicationComponent;
  let fixture: ComponentFixture<UserProfileApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserProfileApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
