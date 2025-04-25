import { Component } from '@angular/core';
import { WekaService } from '../../../../../service/weka.service';
@Component({
  selector: 'app-predicciones',
  standalone: false,
  templateUrl: './predicciones.component.html',
  styleUrl: './predicciones.component.css'
})
export class PrediccionesComponent {
  ListaPredicciones: any[] = []
  
  constructor(private prediccionesService: WekaService) {}

  ngOnInit(){
    this.prediccionesService.getPredictions(60).subscribe({
      next: (predictions) => {
        console.log(predictions)
        this.ListaPredicciones = predictions
        console.log(this.ListaPredicciones)
      },
      error: err => {
        console.error('Error al obtener las predicciones:', err);
      }
    })
  }

  
}
