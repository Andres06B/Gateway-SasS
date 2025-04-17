import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipAdmComponent } from './vip-adm.component';

describe('VipAdmComponent', () => {
  let component: VipAdmComponent;
  let fixture: ComponentFixture<VipAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VipAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
