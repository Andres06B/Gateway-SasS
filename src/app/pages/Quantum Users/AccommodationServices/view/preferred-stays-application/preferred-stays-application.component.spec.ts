import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredStaysApplicationComponent } from './preferred-stays-application.component';

describe('PreferredStaysApplicationComponent', () => {
  let component: PreferredStaysApplicationComponent;
  let fixture: ComponentFixture<PreferredStaysApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreferredStaysApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferredStaysApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
