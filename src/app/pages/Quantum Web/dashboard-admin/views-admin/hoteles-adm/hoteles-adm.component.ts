import { Component } from '@angular/core';
import { hotels } from '../../../../../interface/hotels.interface';
import { HotelsService } from '../../../../../service/hotels.service';

@Component({
  selector: 'app-hoteles-adm',
  standalone: false,
  templateUrl: './hoteles-adm.component.html',
  styleUrl: './hoteles-adm.component.css'
})
export class HotelesAdmComponent {
  Hotels: hotels[] = []

  constructor(
    private hotelService: HotelsService
  ) {}

  ngOnInit(){
    this.findAll()
  }

  findAll(){
    this.hotelService.getHotels().subscribe({
      next: (response) => {
        this.Hotels = response
        console.log(this.Hotels)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }
}
