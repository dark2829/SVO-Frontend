import { Injectable } from '@angular/core';
import { EnlacesService } from './enlaces.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authURL = this.enlaces.AUTH_URL;

  constructor(
    private http: HttpClient,
    private enlaces: EnlacesService
  ) { }

  /*
  es lo que contiene persona 
  */
}
