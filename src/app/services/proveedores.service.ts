import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnlacesService } from './enlaces.service';
import { TokenService } from './token.service';
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
    private enlaces: EnlacesService,
    private token: TokenService
    ) { }
  
  //* Métodos Get
  public getAllProveedores(): Observable<any>{
    return this.http.get(this.API_Proveedores);
  }

  //* Métodos Post
  public saveProveedor(url: string, body: {nombre: string; telefono: string; correo: string; direccion: string; provee: string; }){
    const headers: any = {
      "Authorization": 'Bearer '+this.token.getToken(),
      "Access-Control-Allow-Origin" : "*"
   };

   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
   httpOptions.headers.set('Authorization',this.token.getToken());
    return this.http.post(url, body, httpOptions);
  }
}
