import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsApplicationsComponent } from './reservations-applications.component';

describe('ReservationsApplicationsComponent', () => {
  let component: ReservationsApplicationsComponent;
  let fixture: ComponentFixture<ReservationsApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationsApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
