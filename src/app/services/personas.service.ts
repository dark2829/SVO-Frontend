import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {  
  constructor(private http: HttpClient) {  }

  //* Métodos get
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

  public updateClient(url: string, body: {
    nombre: string; 
    apellido_paterno: string; 
    apellido_materno: string; 
    fecha_nacimiento: string; 
    genero: string; 
    correo: string; 
    contrasena: string; 
    telefono: string; 
    idDireccion: string; 
    calle: string; 
    colonia: string; 
    municipio: string; 
    estado: string; 
    cp: string; 
    n_interio: number; 
    n_exterior: number; 
    referencia: string; 
    idTarjet: number; 
    nombre_propietario: string; 
    numero_tarjeta: string; 
    fecha_vencimiento: string; 
    cvv: number; 
  }){
    return this.http.post(url, body);
  }
}
