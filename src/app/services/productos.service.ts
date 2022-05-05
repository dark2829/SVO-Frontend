import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnlacesService } from './enlaces.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  //* Variables
  private API_Productos = this.enlaces.API_ENLACE_PRODUCTOS+this.enlaces.PRODUCTO_BUSCAR;
  constructor(
    private http: HttpClient, 
    private enlaces: EnlacesService
  ) { }

  public getAllProductos(): Observable<any>{
    return this.http.get(this.API_Productos);
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

  }){
    return this.http.post(url, body);
  }
}
