import { Component } from '@angular/core';

@Component({
  selector: 'app-root', //Tag para mandar a llamar a index html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { //Declaración de variables 
  titulo = 'Hola mundo desde angular';
  nombre = 'Juan';
}
