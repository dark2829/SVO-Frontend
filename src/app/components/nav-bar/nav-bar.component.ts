import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { HttpClient } from '@angular/common/http';
import { EnlacesService } from '../../services/enlaces.service';
import { map } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  
  isAdmin: boolean | false; 
  isCliente: boolean | false;
  isEmpleado: boolean | false;
  index: string; 
  
  
  id: string; 
  nombre: string; 
  apellido: string;
  idRol: string; 
  rol: string; 
  rolTipo: string;
  isLogged: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private persona: PersonasService, 
    private token: TokenService
  ) { }

  ngOnInit(): void {
    //TODO: revisar, tal vez se requiera hacer una comparacion para saber de doonde viene el id.
    if(this.token.getToken()){
      this.isLogged = true; 
      this.id = this.token.getID(); 
      this.nombre = this.token.getNombre();
      this.rol = this.token.getAuthorieties();
      if (this.rol == 'Administrador') {
        this.isAdmin = true;
      }
      if (this.rol == 'Empleado') {
        this.isEmpleado = true;
      }
      if (this.rol == 'Cliente') {
        this.isCliente = true;
      }
    }else{
      this.isLogged = false;
      this.nombre = "";
      console.log("No tiene una sesion iniciada");
    }

    
  }

  cerrar(){
    this.token.logout();
    this.isAdmin = false;
    this.isCliente = true;
    this.isEmpleado = false;
    this.id = "";
    this.nombre = "";
    this.apellido = "";
    this.idRol = "";
    this.rolTipo = "";
    this.isLogged=  false;
    // window.location.reload();
    this.router.navigate(['login']);
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
