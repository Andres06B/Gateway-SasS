import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHostalComponent } from './info-hostal.component';

describe('InfoHostalComponent', () => {
  let component: InfoHostalComponent;
  let fixture: ComponentFixture<InfoHostalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoHostalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoHostalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
