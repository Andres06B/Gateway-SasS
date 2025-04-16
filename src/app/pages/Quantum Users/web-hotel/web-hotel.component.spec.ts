import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHotelComponent } from './web-hotel.component';

describe('WebHotelComponent', () => {
  let component: WebHotelComponent;
  let fixture: ComponentFixture<WebHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
