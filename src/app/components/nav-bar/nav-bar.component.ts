import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { HttpClient } from '@angular/common/http';
import { EnlacesService } from '../../services/enlaces.service';
import { map } from 'rxjs';

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
  rolTipo: string;
  isOnline: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private persona: PersonasService
  ) { }

  ngOnInit(): void {
    //TODO: revisar, tal vez se requiera hacer una comparacion para saber de doonde viene el id. 
    this.index = this.route.snapshot.params['id'];
    
    // Aqui llenamos todas las variables
    this.persona.getPerson(this.index).subscribe(response => {
      this.id = response.id.toString();
      this.nombre = response.idPersona.nombre;
      this.idRol = response.idRol.id
      if(response.idRol.id == 1){
        this.isAdmin = true; 
      }
      if(response.idRol.id == 2){
        this.isEmpleado = true;
      }
      if(response.idRol.id == 3){
        this.isCliente = true;
      }
      this.isOnline = true; 
    });

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
