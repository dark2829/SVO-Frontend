import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorempleadoService implements HttpInterceptor {
  
  constructor(
    private token: TokenService, 
    private http: HttpHandler
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let intReq = req; 
    const token = this.token.getToken();
    if(token != null){
      intReq = req.clone({headers: req.headers.set('Authorization', 'Barer' + token)});
    }
    return next.handle(intReq);
  }
}

export const interceptorEmpleado = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorempleadoService, multi: true}];