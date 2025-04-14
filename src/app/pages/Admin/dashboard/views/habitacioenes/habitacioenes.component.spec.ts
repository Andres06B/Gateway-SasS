import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacioenesComponent } from './habitacioenes.component';

describe('HabitacioenesComponent', () => {
  let component: HabitacioenesComponent;
  let fixture: ComponentFixture<HabitacioenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HabitacioenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitacioenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
