import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationPredictionDTO, WekaResponseDTO } from '../interfaces_weka/wekaResponseDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WekaService {
  private apiUrl = 'http://localhost:8080/api/prediccion/predict'; 

  constructor(private http: HttpClient) {}

  predict(input: ReservationPredictionDTO ): Observable<WekaResponseDTO> {
    return this.http.post<WekaResponseDTO>(this.apiUrl, input);
  }
}
