import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHotelComponent } from './login-hotel.component';

describe('LoginHotelComponent', () => {
  let component: LoginHotelComponent;
  let fixture: ComponentFixture<LoginHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
