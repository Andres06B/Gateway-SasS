import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesAdmComponent } from './hoteles-adm.component';

describe('HotelesAdmComponent', () => {
  let component: HotelesAdmComponent;
  let fixture: ComponentFixture<HotelesAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotelesAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelesAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
