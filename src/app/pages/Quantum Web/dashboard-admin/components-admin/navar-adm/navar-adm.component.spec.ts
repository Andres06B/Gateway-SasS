import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavarAdmComponent } from './navar-adm.component';

describe('NavarAdmComponent', () => {
  let component: NavarAdmComponent;
  let fixture: ComponentFixture<NavarAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavarAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavarAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
