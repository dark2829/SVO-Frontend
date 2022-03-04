import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shophistory',
  templateUrl: './shophistory.component.html',
  styleUrls: ['./shophistory.component.css']
})
export class ShophistoryComponent implements OnInit {
  //Variables 
  fecha = "12 de febrero de 2022";
  codigo = "abcdefgh";
  productos = "jabón roma";


  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  home() {
    this.router.navigate(['']);
  }

  login(){
    this.router.navigate(['login']);//agregamos la ruta con el nombre especificado en app-routing.module.ts
  }

  solicitudCancelacion(){
    this.router.navigate(['cancel-request']);
  }
}
