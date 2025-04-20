import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveCompanionsApplicationComponent } from './reserve-companions-application.component';

describe('ReserveCompanionsApplicationComponent', () => {
  let component: ReserveCompanionsApplicationComponent;
  let fixture: ComponentFixture<ReserveCompanionsApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveCompanionsApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveCompanionsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
