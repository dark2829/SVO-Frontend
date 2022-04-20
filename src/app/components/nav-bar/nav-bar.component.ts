import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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

    shopping_cart(){
      this.router.navigate(['shopping-cart']);
    }

    cancelRequest(){
      this.router.navigate(['cancel-request']);
    }
}
