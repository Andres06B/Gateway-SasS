import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWEbComponent } from './header-web.component';

describe('HeaderWEbComponent', () => {
  let component: HeaderWEbComponent;
  let fixture: ComponentFixture<HeaderWEbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderWEbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderWEbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
