import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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

  public updateSatus(idPedido: string, newState: string){
    const API = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_UPDATE_STATUS+idPedido+this.enlaces.PEDIDOS_NEW_STATE+newState;
    return this.http.get(API);
  }

  public findTypePedido(tipo: string): Observable<any>{
    const API = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_FIND_TYPE+tipo;
    const headers: any = {
      "Authorization": 'Bearer '+this.token.getToken(),
      "Access-Control-Allow-Origin" : "*"
   };

   //Post options pass it to HttpHeaders Class 
   const httpOptions = {
       headers: new HttpHeaders(headers),
   };
   httpOptions.headers.set('Authorization',this.token.getToken());
    return this.http.get(API, httpOptions);
  }

  public requestCanceled(idShopping: string, body:{
    "motivoCancelacion": string
  }){
    const URL = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_CANCELED+idShopping; 
    return this.http.post<any>(URL, body);
  }

  public getPedidoById(idPedido: string): Observable<any>{
    const URL = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_FIND_ID+idPedido;
    return this.http.get(URL);
  }

  public responseRequestCancelWhitEmail(body: {
    "idPedido":string,
    "mailTo": string
  }){
    const URL = this.enlaces.API_ENLACE_PEDIDO+this.enlaces.PEDIDOS_RESPONSE_CANCEL_EMAIL;
    return this.http.post(URL, body);
  }
  public responseRequestCancel(idPedido: string, body: {
    "motivo_res":string,
    "estatus": string
  }){
    const URL = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_RESPONSE_CANCEL+idPedido;
    return this.http.post(URL, body);
  }

  public findRequestToCode(dataCode: string): Observable<any>{
    const API = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_FIND_DATA_CODE+dataCode; 

    return this.http.get(API);
  }
}