import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
  providedIn: 'root' 
  }
)

export class ProveedoresService {

  //Definir el endpoint a conectar
  private API_Proveedores = "http://localhost:8080/proveedores/findAllProveedores"; 

  constructor(private http: HttpClient) { }
  
  //* Métodos Get
  public getAllProveedores(): Observable<any>{
    return this.http.get<any>(this.API_Proveedores);
  }

  //* Métodos Post
  public saveProveedor(url: string, body: {nombre: string; telefono: string; correo: string; direccion: string; provee: string; }){
    return this.http.post(url, body);
  }

  //* Métodos Update
  //* Componente a componente 
}
