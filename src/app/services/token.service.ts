import { Injectable } from '@angular/core';

const TOKEN_KEY: string = 'AuthToken';
const IDENTIFICADOR_KEY = 'AuthIdentificador';
const NOMBRE_KEY = 'AuthNombre';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  roles: Array<string> = [];

  constructor() { }

  public setToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    // window.sessionStorage.removeItem(TOKEN_KEY);
  }

  public getToken(): string{
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public setIdentificador(identify: string): void{
    window.sessionStorage.removeItem(IDENTIFICADOR_KEY);
    window.sessionStorage.setItem(IDENTIFICADOR_KEY, identify);
  }

  public getIdentificador(): string{
    return sessionStorage.getItem(IDENTIFICADOR_KEY)!;
  }

  public setNombre(name: string): void{
    window.sessionStorage.removeItem(NOMBRE_KEY);
    window.sessionStorage.setItem(NOMBRE_KEY, name);
  }

  public getNombre(): string{
    return sessionStorage.getItem(NOMBRE_KEY)!;
  }

  public setAuthorities(authorities: string[]): void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));    
  }

  public getAuthorieties(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(AUTHORITIES_KEY)){
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((auth: any) => {
        this.roles.push(auth.auth)
      });
    }

    return this.roles; 
  }

  public logout(): void{
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(IDENTIFICADOR_KEY);
    window.sessionStorage.removeItem(NOMBRE_KEY);
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
  }
}
