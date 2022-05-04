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
  rolTipo: string;
  isOnline: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private persona: PersonasService, 
    private token: TokenService
  ) { }

  ngOnInit(): void {
    //TODO: revisar, tal vez se requiera hacer una comparacion para saber de doonde viene el id.
    if(this.token.getToken()){
      this.index = this.route.snapshot.params['id'];
      // Aqui llenamos todas las variables opcion 1
      this.persona.getPerson(this.index).subscribe(response => {
        this.id = response.data.idPersona.id.toString();
        this.nombre = response.data.idPersona.nombre;
        this.idRol = response.data.idRol.id
        if (response.data.idRol.id == 1) {
          this.isAdmin = true;
        }
        if (response.data.idRol.id == 2) {
          this.isEmpleado = true;
        }
        if (response.data.idRol.id == 3) {
          this.isCliente = true;
        }
        this.isOnline = true;
      }); 
    }else{
      console.log("no se que paso");
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
    this.isOnline=  false;
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
