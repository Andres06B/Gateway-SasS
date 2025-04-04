import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelUsersComponent } from './hotel-users.component';

describe('HotelUsersComponent', () => {
  let component: HotelUsersComponent;
  let fixture: ComponentFixture<HotelUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
