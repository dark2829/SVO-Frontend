import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router//usa un servicio router 
  ){

  }
  home(){
  this.router.navigate (['']);
  }

  login(){
    this.router.navigate(['login']);//agregamos la ruta con el nombre especificado en app-routing.module.ts
  }

  modificarPerfil(){
    this.router.navigate(['modifyPerfil']);
  }

  shopHistory(){
    this.router.navigate(['shopHistory']);
  }

  favoritos(){
    this.router.navigate(['favoritos']);
  }
}