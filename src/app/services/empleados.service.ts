import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { EnlacesService } from './enlaces.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient, 
    private token: TokenService,
    private enlaces: EnlacesService
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

  public getAllEmpleados(): Observable<any>{
    return this.http.get(this.enlaces.API_ENLACE_EMPLEADO+this.enlaces.EMPLEADO_BUSCAR_ALL);
  }
  public getAllEmpleadosByID(id: string): Observable<any>{
    return this.http.get(this.enlaces.API_ENLACE_EMPLEADO+this.enlaces.EMPLEADO_BUSCAR_ID+id);
  }
}
