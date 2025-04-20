import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveStatusApplicationsComponent } from './reserve-status-applications.component';

describe('ReserveStatusApplicationsComponent', () => {
  let component: ReserveStatusApplicationsComponent;
  let fixture: ComponentFixture<ReserveStatusApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveStatusApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveStatusApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
