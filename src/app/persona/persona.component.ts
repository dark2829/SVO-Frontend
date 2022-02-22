import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {
  nombre: string = "Alejandro";
  apellido: string = "Toscuento";
  public edad: number = 21; 
}
