import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumAdmComponent } from './premium-adm.component';

describe('PremiumAdmComponent', () => {
  let component: PremiumAdmComponent;
  let fixture: ComponentFixture<PremiumAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
