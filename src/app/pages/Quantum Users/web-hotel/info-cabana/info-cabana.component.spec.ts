import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCabanaComponent } from './info-cabana.component';

describe('InfoCabanaComponent', () => {
  let component: InfoCabanaComponent;
  let fixture: ComponentFixture<InfoCabanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoCabanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCabanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
