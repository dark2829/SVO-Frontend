import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  constructor() { }

  showAlert(texto: string, tipe: string,  time: number = 3000, status: string = "200"){
    switch(parseInt(status)){
      case 0: 
      texto = "Error de conexión"
      tipe = "alert-danger"
        this.alertSource.next({texto, tipe, time});
      break; 
      default:
        this.alertSource.next({texto, tipe, time});
      break; 
    }

  }
}
