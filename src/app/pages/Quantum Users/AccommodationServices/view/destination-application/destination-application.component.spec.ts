import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationApplicationComponent } from './destination-application.component';

describe('DestinationApplicationComponent', () => {
  let component: DestinationApplicationComponent;
  let fixture: ComponentFixture<DestinationApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
