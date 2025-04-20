import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreseRevationsApplicationComponent } from './myrese-revations-application.component';

describe('MyreseRevationsApplicationComponent', () => {
  let component: MyreseRevationsApplicationComponent;
  let fixture: ComponentFixture<MyreseRevationsApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyreseRevationsApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyreseRevationsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
