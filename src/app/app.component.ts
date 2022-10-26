import { Component } from '@angular/core';
import { AlertaService } from './services/alerta.service';
@Component({
  selector: 'app-root', //Tag para mandar a llamar a index html
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent { //Declaración de variables 
  
  showAlert: boolean = false; 
  timepo: number; 
  mensaje: string; 
  tipo: any; 


  constructor(
    private alertService: AlertaService
  ) { }

  ngOnInit() {
    this.alertService.alert$.subscribe((response: any) => { 
      this.showAlert = true; 
      this.mensaje = response.texto; 
      this.tipo = "alert-"+response.tipe; 
      this.timepo = response.time;
      setTimeout(() => { this.showAlert = false }, this.timepo);
    });
  }
  
}
