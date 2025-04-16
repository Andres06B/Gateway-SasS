import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuantumComponent } from './admin-quantum.component';

describe('AdminQuantumComponent', () => {
  let component: AdminQuantumComponent;
  let fixture: ComponentFixture<AdminQuantumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminQuantumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminQuantumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
