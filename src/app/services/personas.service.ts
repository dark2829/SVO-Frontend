import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnlacesService } from './enlaces.service';

@Injectable({
  providedIn: 'root'
})
export class PersonasService { 

  idPerson: number; 
  idUser: number; 

  constructor(
    private http: HttpClient, 
    private enlaces: EnlacesService
  ) { }

  //* Métodos get
  public getClientInfo(id: string): Observable<any>{
    console.log(this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_BUSCAR+id);
    return this.http.get(this.enlaces.API_ENLACE_PERSONAS+this.enlaces.PERSONA_BUSCAR+id);
  }
  //* Métodos post
  public insertClient(url: string, body: {
    nombre: string;
    apellido_paterno: string;
    correo: string;
    contrasena: string;
    idRol: number; 
  }) {
    return this.http.post(url, body);
  }

  public updateClientAll(url: string, body: {
    nombre: string; 
    apellido_paterno: string; 
    apellido_materno: string; 
    fecha_nacimiento: string; 
    genero: string; 
    correo: string; 
    contrasena: string; 
    telefono: string; 
    idDireccion: number; 
    calle: string; 
    colonia: string; 
    municipio: string; 
    estado: string; 
    cp: string; 
    n_interio: number; 
    n_exterior: number; 
    referencia: string; 
    idTarjeta: number; 
    nombre_propietario: string; 
    numero_tarjeta: string; 
    fecha_vencimiento: string; 
    cvv: number; 
  }){
    return this.http.post(url, body);
  }
  public updateClientDataPerson(url: string, body: {
    nombre: string; 
    apellido_paterno: string; 
    apellido_materno: string; 
    fecha_nacimiento: string; 
    genero: string; 
    correo: string; 
    contrasena: string; 
    telefono: string; 
  }){
    return this.http.post(url, body);
  }
  public updateClientDirection(url: string, body: {
    idDireccion: number; 
    calle: string; 
    colonia: string; 
    municipio: string; 
    estado: string; 
    cp: string; 
    n_interio: number; 
    n_exterior: number; 
    referencia: string; 
    idTarjeta: number; 
    nombre_propietario: string; 
    numero_tarjeta: string; 
    fecha_vencimiento: string; 
    cvv: number; 
  }){
    return this.http.post(url, body);
  }
  public updateClientTarget(url: string, body: {
    idTarjeta: number; 
    nombre_propietario: string; 
    numero_tarjeta: string; 
    fecha_vencimiento: string; 
    cvv: number; 
  }){
    return this.http.post(url, body);
  }
}
