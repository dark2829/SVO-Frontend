import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient, 
    private token: TokenService
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
    const headers: any = {
      "Authorization": 'Bearer '+this.token.getToken(),
      "Access-Control-Allow-Origin" : "*"
   };

   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
   httpOptions.headers.set('Authorization',this.token.getToken());

    return this.http.post<any>(url, body, httpOptions);
  }
}
