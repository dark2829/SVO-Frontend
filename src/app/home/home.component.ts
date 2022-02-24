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

  login(){
    this.router.navigate(['login']);//agregamos la ruta con el nombre especificado en app-routing.module.ts
  }
}
