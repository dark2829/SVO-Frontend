import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnlacesService } from './enlaces.service';
import { error } from '@angular/compiler/src/util';
import { NewUser} from '../models/newUser';
import { JwtDTO } from '../models/jwtDTO';

@Injectable({
  providedIn: 'root'
})
export class PersonasService { 

  idPerson: number; 
  idUser: number; 
  personInfo: any; 

  authURL = this.enlaces.AUTH_URL; 

  constructor(
    private http: HttpClient, 
    private enlaces: EnlacesService
  ) { }

  //* Métodos get
  public getPerson(id: string): Observable<any>{
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
    return this.http.post<any>(url, body);
  }

  public inicioSesion(body: {
    identificador: string; 
    contrasena: string; 
  }): Observable<any>{
    return this.http.post<any>(this.authURL+ 'login/', body)
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
  //FIXME: Falta modificar para empleados
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
