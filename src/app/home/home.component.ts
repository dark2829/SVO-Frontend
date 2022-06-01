import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../services/enlaces.service';
import { ProductosService } from '../services/productos.service';
import { PersonasService } from '../services/personas.service';
import { AlertaService } from '../services/alerta.service';
import { TokenService } from '../services/token.service';
import { ComunicacionService } from '../services/comunicacion.service';

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
  producLikes: boolean [];

  index: number; 

  likeId = document.getElementsByClassName("targetProduct");
  
  tipoProduct: string;
  
  constructor(
    private router: Router, //usa un servicio router 
    private route: ActivatedRoute, // Usa el servicio de route para obtener informacion de la ruta
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer, 
    private persona: PersonasService,
    private alerta: AlertaService,
    private token: TokenService, 
    private comunicacion: ComunicacionService
    
  ){

  }

  

  ngOnInit(): void {
    //FIXME: revisar porque aveces el arreglo es 0
    if(this.token.isLogged() != false){
      this.persona.getProductLike(this.token.getID()).subscribe(response => {
        for (let carta = 0; carta < this.likeId.length; carta++) {
          response.data.forEach((element: any) => {
            if(this.likeId[carta].classList.contains(element.id)){
              this.likeId[carta].classList.add("bg-danger", "text-white", "lineaBlanca");
            }
          })
        }
      });
    }

    this.producto.getAllProductosClient().subscribe(response => {
      this.productos =  response.data;
      this.comunicacion.enviarMensajeObservable.subscribe(response => {
        this.productos =  response;
      });
    });
    
    this.productos = Object.values(this.productos);
    this.index = this.route.snapshot.params['id'];
  }

  like(idProducto: number){
    if(this.token.getToken() != null){
      for (let carta = 0; carta < this.likeId.length; carta++) {
        if(this.likeId[carta].classList.contains(idProducto.toString())){
          if(this.likeId[carta].classList.contains("bg-danger")){
            this.persona.deleteFavorite(idProducto.toString(), this.token.getID()).subscribe(response => {
              this.alerta.showAlert(response.message, "success", 2500);
              this.likeId[carta].classList.remove("bg-danger", "text-white", "lineaBlanca"); 
            });   
          }else{
          this.persona.addFavorite(idProducto.toString(), this.token.getID().toString()).subscribe(response => {
            this.alerta.showAlert(response.message, "success", 2500);
            this.likeId[carta].classList.add("bg-danger", "text-white", "lineaBlanca");
          });
          }
        }
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
        this.alerta.showAlert("Producto añadido", "success", 2500);
        // this.alerta.showAlert(response.data.carrito[response.data.carrito.length-1].idProducto.nombre+" añadido", "success", 2500);
      }, reject => {
        console.log(reject)
        //FIXME: Revisar respuesta
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