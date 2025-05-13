import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteQuComponent } from './asistente-qu.component';

describe('AsistenteQuComponent', () => {
  let component: AsistenteQuComponent;
  let fixture: ComponentFixture<AsistenteQuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenteQuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteQuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
