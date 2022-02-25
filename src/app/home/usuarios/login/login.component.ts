import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    private router:Router
  ) { }
  
  ingresar(){
    this.router.navigate(['']);
  }

  registro(){
    this.router.navigate(['registro']);
  }

  recovery(){
    this.router.navigate(['recovery']);
  }
}
