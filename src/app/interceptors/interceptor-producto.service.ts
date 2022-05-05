import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorProductoService implements HttpInterceptor {

  constructor(
    private token: TokenService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("No se de donde sale");
    let intReq = req; 
    const token = this.token.getToken();
    if(token != null){
      intReq = req.clone({headers: req.headers.set('Authorization', 'Barer' + token)});
    }
    return next.handle(intReq);
  }
}

export const intrceptorProducto = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorProductoService, multi: true}]
