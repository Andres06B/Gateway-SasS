import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteQAComponent } from './asistente-qa.component';

describe('AsistenteQAComponent', () => {
  let component: AsistenteQAComponent;
  let fixture: ComponentFixture<AsistenteQAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsistenteQAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
