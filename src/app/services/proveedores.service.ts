import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable(
  /* {
  providedIn: 'root' 
  } */
)

export class ProveedoresService {

  //Definir el endpoint a conectar
  private API_Proveedores = "http://localhost:8080/proveedores/findAllProveedores"; 

  constructor(private http: HttpClient) { }

  getAllProveedores(): Observable<any>{
    return this.http.get<any>(this.API_Proveedores);
  }
}
