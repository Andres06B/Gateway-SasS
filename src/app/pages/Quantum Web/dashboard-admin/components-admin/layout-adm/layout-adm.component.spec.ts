import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAdmComponent } from './layout-adm.component';

describe('LayoutAdmComponent', () => {
  let component: LayoutAdmComponent;
  let fixture: ComponentFixture<LayoutAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
