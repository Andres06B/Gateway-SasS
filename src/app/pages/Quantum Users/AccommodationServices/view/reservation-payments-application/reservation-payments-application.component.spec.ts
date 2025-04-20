import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPaymentsApplicationComponent } from './reservation-payments-application.component';

describe('ReservationPaymentsApplicationComponent', () => {
  let component: ReservationPaymentsApplicationComponent;
  let fixture: ComponentFixture<ReservationPaymentsApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationPaymentsApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationPaymentsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
