import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnlacesService } from './enlaces.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  //* Variables
  private API_Productos = this.enlaces.API_ENLACE_PRODUCTOS+this.enlaces.PRODUCTO_BUSCAR;

  constructor(
    private http: HttpClient, 
    private enlaces: EnlacesService, 
    private token: TokenService
  ) { }

  public getAllProductos(): Observable<any>{
    return this.http.get(this.API_Productos);
  }

  public getProductID(id: string): Observable<any>{
    return this.http.get(this.enlaces.API_ENLACE_PRODUCTOS+this.enlaces.PRODUCTO_BUSCAR_ID+id)
  }

  public saveProducto(url: string, body: {
    codigo_prod: string, 
    nombre: string, 
    categoria: string, 
    cantidad: number, 
    precio_compra: number, 
    precio_venta: number, 
    precio_descuento: number, 
    descripcion: string,
    status: string
  }){
    return this.http.post(url, body);
  }
  
  //FIXME: revisar que variables necesita
  public updateProducto(url: string, body: {
    codigo_prod: string, 
    nombre: string, 
    categoria: string, 
    cantidad: number, 
    precio_compra: number, 
    precio_venta: number, 
    precio_descuento: number, 
    descripcion: string,
    estatus: string
  }){
    const headers = new HttpHeaders({
      'Authorization': this.token.getToken(), 
      /* 'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token' */
    });

    /* let headers = new HttpHeaders();
    if(this.token.getToken()){
      // headers.append("Content-Type", "aplication/json"),
      headers.append("Authorization", "barer"+this.token.getToken());
    }*/
    return this.http.post(url, body, {headers});
  }
}
