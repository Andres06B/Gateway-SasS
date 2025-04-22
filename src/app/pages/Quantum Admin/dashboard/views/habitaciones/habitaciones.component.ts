import { Component } from '@angular/core';
import { rooms } from '../interfaces/rooms.interface';
import { RoomsService } from '../../../../../service/rooms.service';
@Component({
  selector: 'app-habitaciones',
  standalone: false,
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css'
})
export class HabitacionesComponent {
  Rooms: rooms[] = []
  constructor(private habitacionesservices:RoomsService){

  }
    ngOInit(){
      this.Habitaciones()
    }
    Habitaciones(){
      this.habitacionesservices.getRooms().subscribe(
        (data)=>{
          this.Rooms=data
          console.log(this.Rooms)
        }
      )
    }
}
