import { Router, ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { TokenService } from 'src/app/services/token.service';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ProductosService } from 'src/app/services/productos.service';

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

  searchProd: string;
  
  id: string; 
  nombre: string; 
  apellido: string;
  idRol: string; 
  rol: string; 
  rolTipo: string;
  isLogged: boolean = false;

  tipoProduct: string; 
  patas: any = ['/shopHistory', '/modifyPerfil', '/favoritos', '/shopping-cart'];
  path: any; 

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private persona: PersonasService, 
    private token: TokenService, 
    private comunicacion: ComunicacionService, 
    private producto: ProductosService,
  ) { }
  
  ngOnInit(): void {
    this.path = this.patas.includes(window.location.pathname);

    if(this.token.getToken()){
      this.isLogged = true; 
      this.id = this.token.getID(); 
      this.nombre = this.token.getNombre();
      this.rol = this.token.getAuthorieties();
      if (this.rol.includes("Administrador")) {
        this.isAdmin = true;
      }
      if (this.rol.includes("Empleado")) {
        this.isEmpleado = true;
      }
      if (this.rol.includes("Cliente")) {
        this.isCliente = true;
      }
    }else{
      this.isLogged = false;
      this.nombre = "";
    }
  }
  
  getProduct = (event: Event) => {
    this.searchProd = (<HTMLInputElement>event.target).value;
  }

  showProduct = () => {
    if(this.searchProd != null && this.searchProd != ""){
      this.producto.findProd(this.searchProd).subscribe(response => {
        console.log(response);
        this.comunicacion.enviarMensaje(response.data);
      });
    }
  }

  categoria(mensaje: any){
    if(mensaje == "all"){
      this.producto.getAllProductosClient().subscribe(response => {
        this.comunicacion.enviarMensaje(response.data);
      });
    }else{
      this.producto.findTypeProducts(mensaje).subscribe(response => {
        this.comunicacion.enviarMensaje(response.data);
      });
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
    window.sessionStorage.setItem('Values', '1');
    this.router.navigate(['login']);
  }
  
  home(typeruser: string) {
    if(typeruser.includes("Administrador"))
      this.router.navigate(['home-admin']);
    if(typeruser.includes("Empleado"))
      this.router.navigate(['home-empleado']);
    if(typeruser.includes("Cliente"))
      this.router.navigate(['']);
    
    if(window.sessionStorage.getItem('Values')){
      window.sessionStorage.removeItem('Values');
    }
  }

  login() {
    this.router.navigate(['login']);//agregamos la ruta con el nombre especificado en app-routing.module.ts
  }

  modificarPerfil() {
    window.sessionStorage.setItem('Values', '1');
    this.router.navigate(['modifyPerfil']);
  }

  shopHistory() {
    window.sessionStorage.setItem('Values', '1');
    this.router.navigate(['shopHistory']);
  }

  favoritos() {
    window.sessionStorage.setItem('Values', '1');
    this.router.navigate(['favoritos']);
  }

  shopping_cart() {
    this.router.navigate(['shopping-cart']);
  }

  cancelRequest() {
    this.router.navigate(['cancel-request']);
  }
}