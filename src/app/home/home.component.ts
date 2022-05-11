import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../services/enlaces.service';
import { ProductosService } from '../services/productos.service';
import { map } from 'rxjs';
import { PersonasService } from '../services/personas.service';
import { AlertaService } from '../services/alerta.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productos: any = {
  };
  fileChange: boolean [];
  preView: any;
  img: any;
  
  index: number; 
  
  constructor(
    private router: Router, //usa un servicio router 
    private route: ActivatedRoute, // Usa el servicio de route para obtener informacion de la ruta
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer, 
    private persona: PersonasService,
    private alerta: AlertaService,
    private token: TokenService
    
  ){

  }

  ngOnInit(): void {
    this.producto.getAllProductos().subscribe(response => {
      this.productos = response.data;
    });
    this.index = this.route.snapshot.params['id'];
  }
  
  addCarrito(idParam: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+1;
    if(this.token.getToken() != null){
      this.persona.addShopingCar(API_CARR, {
        id: idParam,
        cantidad: 1
      }).subscribe(response => {
        this.persona.productShopping = response.carrito;
        this.alerta.showAlert(response.carrito[response.carrito.length-1].idProducto.nombre+" añadido", "success", 2500);
      }, reject => {
        this.alerta.showAlert("Error al añadir a carrito", "danger", 2500);
      });
    }else{
      this.alerta.showAlert("No tiene una sesion iniciada", "warning", 2500);
    }
  }

  regresarImg(b64: string){
    if(b64 == null){
      return null; 
    }else{
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + `${b64}`);
    }
  }
}