import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAdmComponent } from './servicios-adm.component';

describe('ServiciosAdmComponent', () => {
  let component: ServiciosAdmComponent;
  let fixture: ComponentFixture<ServiciosAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
