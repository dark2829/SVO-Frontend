import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnlacesService } from './enlaces.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(
    private http: HttpClient, 
    private token: TokenService,
    private enlaces: EnlacesService
  ) { }

  public getAllPedidos(){
    const URL_PEDIDOS = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_GET_ALL;
    const headers: any = {
      "Authorization": 'Bearer '+this.token.getToken(),
      "Access-Control-Allow-Origin" : "*"
   };

   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
   httpOptions.headers.set('Authorization',this.token.getToken());

    return this.http.get(URL_PEDIDOS, httpOptions);
  }
}
