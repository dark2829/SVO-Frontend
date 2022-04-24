import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnlacesService } from './enlaces.service';
@Injectable(
  {
  providedIn: 'root'
  }
)

export class ProveedoresService {

  //Definir el endpoint a conectar
  private API_Proveedores = this.enlaces.API_ENLACE_PROVEEDOR.concat(this.enlaces.PROVEEDOR_BUSCAR); 

  constructor(
    private http: HttpClient,
    private enlaces: EnlacesService
    ) { }
  
  //* Métodos Get
  public getAllProveedores(): Observable<any>{
    return this.http.get(this.API_Proveedores);
  }

  //* Métodos Post
  public saveProveedor(url: string, body: {nombre: string; telefono: string; correo: string; direccion: string; provee: string; }){
    return this.http.post(url, body);
  }

  //* Métodos Update
  //* Componente a componente 
}
