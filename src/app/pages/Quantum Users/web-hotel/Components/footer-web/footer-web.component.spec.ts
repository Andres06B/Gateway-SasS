import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterWEbComponent } from './footer-web.component';

describe('FooterWEbComponent', () => {
  let component: FooterWEbComponent;
  let fixture: ComponentFixture<FooterWEbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterWEbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterWEbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
