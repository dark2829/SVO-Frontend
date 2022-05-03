import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient
  ) { }

  public saveEmpleado(url: string, body: {
    nombre: string;
    apellido_paterno: string; 
    apellido_materno: string; 
    fecha_nacimiento: string; 
    genero: string; 
    telefono: string; 
    correo: string; 
    curp: string; 
    idPuesto: number; 
    salario: number; 
    contrasena: string; 
    idRol: number;
  }){
    return this.http.post(url, body);
  }
}
