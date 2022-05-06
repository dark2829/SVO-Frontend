import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardHomeService implements CanActivate {
  
  realRol: string; 
  constructor(
    private token: TokenService, 
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = route.data['expectedRol']; 
    console.log(expectedRol);
    const roles = this.token.rolesExistentes;
    // this.realRol = 'Administrador';
    roles.forEach(rol => {
      if(rol == 'Administrador'){
        this.realRol = 'Administrador';
      }
      if(rol == 'Empleado'){
        this.realRol = 'Empleado';
      }
      if(rol == 'Cliente'){
        this.realRol = 'Cliente';
      }
    });
    
    //*No contiene el token
    if(!this.token.getToken()){
      if(expectedRol == "Administrador" || expectedRol == "Empleado" || expectedRol == "Cliente"){
        this.router.navigate(['login']); 
        return false; 
      }
      if(expectedRol.includes("Empleado") && expectedRol.includes("Administrador")){
        this.router.navigate(['login']); 
        return false; 
      }
    }
    return true; 

  }
}
