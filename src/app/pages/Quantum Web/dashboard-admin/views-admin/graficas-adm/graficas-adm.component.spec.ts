import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasAdmComponent } from './graficas-adm.component';

describe('GraficasAdmComponent', () => {
  let component: GraficasAdmComponent;
  let fixture: ComponentFixture<GraficasAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraficasAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
