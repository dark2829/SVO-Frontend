import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../services/enlaces.service';
import { ProductosService } from '../services/productos.service';
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

  likeId = document.getElementsByClassName("buttonLike");
  
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
    this.persona.getProductLike(this.token.getID()).subscribe(response => {
      console.log(response);
      response.data.forEach((element : any) => {
        this.likeId[element.id-1].classList.add("bg-danger", "text-white", "lineaBlanca")
      })      
    });

    this.index = this.route.snapshot.params['id'];
  }

  like(idProducto: number){
    if(this.token.getToken() != null){
      if(this.likeId[idProducto-1].classList.contains("lineaBlanca")){ 
        this.persona.deleteFavorite(idProducto.toString(), this.token.getID()).subscribe(response => {
          this.alerta.showAlert(response.message, "success", 2500);
          this.likeId[idProducto-1].classList.remove("bg-danger", "text-white", "lineaBlanca"); 
        });
      }else{
        this.persona.addFavorite(idProducto.toString(), this.token.getID().toString()).subscribe(response => {
          this.alerta.showAlert(response.message, "success", 2500);
          this.likeId[idProducto-1].classList.add("bg-danger", "text-white", "lineaBlanca");
        });
      }
    }else{
      this.alerta.showAlert("Debería tener una sesión iniciada", "warning", 3000);
    }
  }
  
  addCarrito(idParam: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+1+this.enlaces.CARRITO_INSERT_U+this.token.getID();
    if(this.token.getToken() != null){
      this.persona.addShopingCar(API_CARR, {
        id: idParam,
        cantidad: 1
      }).subscribe(response => {
        this.persona.productShopping = response.data.carrito;
        this.alerta.showAlert(response.data.carrito[response.data.carrito.length-1].idProducto.nombre+" añadido", "success", 2500);
      }, reject => {
        console.log(reject)
        this.alerta.showAlert("Error al añadir a carrito", "danger", 2500);
      });
    }else{
      this.alerta.showAlert("No tiene una sesión iniciada", "warning", 2500);
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