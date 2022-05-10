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
    imagen: string,
    nombre: string, 
    categoria: string, 
    cantidad: number, 
    precio_compra: number, 
    precio_venta: number, 
    precio_descuento: number, 
    descripcion: string,
    estatus: string
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
    console.log(body);
    return this.http.post<any>(url, body, httpOptions);
  }
  
  public updateProducto(url: string, body: {
    codigo_prod: string, 
    imagen: string,
    nombre: string, 
    categoria: string, 
    cantidad: number, 
    precio_compra: number, 
    precio_venta: number, 
    precio_descuento: number, 
    descripcion: string,
    estatus: string
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


   //Do requesti
   return this.http.post<any>(url, body, httpOptions)
  }
}
