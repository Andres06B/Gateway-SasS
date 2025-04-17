import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosAdmComponent } from './pagos-adm.component';

describe('PagosAdmComponent', () => {
  let component: PagosAdmComponent;
  let fixture: ComponentFixture<PagosAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagosAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagosAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
