import { TestBed } from '@angular/core/testing';

import { PagoReservaService } from './pago-reserva.service';

describe('PagoReservaService', () => {
  let service: PagoReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
