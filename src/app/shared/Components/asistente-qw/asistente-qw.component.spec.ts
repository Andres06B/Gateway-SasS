import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteQWComponent } from './asistente-qw.component';

describe('AsistenteQWComponent', () => {
  let component: AsistenteQWComponent;
  let fixture: ComponentFixture<AsistenteQWComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenteQWComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteQWComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
