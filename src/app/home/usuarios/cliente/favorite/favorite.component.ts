import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  productos: any = {
  };
  fileChange: boolean [];
  preView: any;
  img: any;

  index: number; 

  likeId = document.getElementsByClassName("productCart");

  constructor(
    private router : Router,
    private route: ActivatedRoute, // Usa el servicio de route para obtener informacion de la ruta
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer, 
    private persona: PersonasService,
    private alerta: AlertaService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    this.persona.getProductLike(this.token.getID()).subscribe(response => {
      this.productos = response.data;    
    });

    this.index = this.route.snapshot.params['id'];
    console.log(this.productos);
  }

  like(idProducto: number){
    if(this.token.getToken() != null){
      console.log(idProducto);
      this.persona.deleteFavorite(idProducto.toString(), this.token.getID()).subscribe(response => {
        this.alerta.showAlert(response.message, "success", 2500);
      });
    }else{
      this.alerta.showAlert("Debería tener una sesión iniciada", "warning", 3000);
    }
    setTimeout(() => { window.location.reload(); }, 2500);
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
