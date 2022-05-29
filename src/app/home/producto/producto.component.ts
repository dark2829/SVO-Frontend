import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';
import { PersonasService } from '../../services/personas.service';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productInfo: any = {};
  cantidad: any = [];
  index: string; 
  formProductoExtend: FormGroup;
  likeId = document.getElementsByClassName("buttonLike");

    constructor(
    private router: Router, //usa un servicio router 
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer,
    private token: TokenService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private persona: PersonasService, 
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    //FIXME: falta cargar si los productos estan en favoritos
    this.index = this.route.snapshot.params['id'].toString();

    if(this.token.getToken()){
      this.producto.getProductID(this.index).subscribe(response => {
        this.productInfo = response.data;
        for(let i = 1; i<= response.data.cantidad; i++ ){
            this.cantidad[i] = i;
        }
        this.formProductoExtend = this.formBuilder.group({
          cantidad: [1]
        });
      });
    }

    this.persona.getProductLike(this.token.getID()).subscribe(response => {
      response.data.forEach((element : any) => {
        if(this.index == element.id){
          this.likeId[0].classList.add("bg-danger", "text-white", "lineaBlanca")
        }
      })      
    });
  }

  like(idProducto: number){
    if(this.likeId[0].classList.contains("lineaBlanca")){
      this.persona.deleteFavorite(idProducto.toString(), this.token.getID()).subscribe(response => {
        this.alerta.showAlert(response.message, "success", 2500);
        this.likeId[0].classList.remove("bg-danger", "text-white", "lineaBlanca"); 
      });
    }else{
      this.persona.addFavorite(idProducto.toString(), this.token.getID().toString()).subscribe(response => {
        this.alerta.showAlert(response.message, "success", 2500);
        this.likeId[0].classList.add("bg-danger", "text-white", "lineaBlanca");
      });
    }
  }

  addCarrito(idParam: number, cantidad: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+cantidad+this.enlaces.CARRITO_INSERT_U+this.token.getID();
    if(this.token.getToken() != null){
      this.persona.addShopingCar(API_CARR, {
        id: idParam,
        cantidad: this.formProductoExtend.value.cantidad
      }).subscribe(response => {
        this.alerta.showAlert(`Producto añadido x ${this.formProductoExtend.value.cantidad}`, "success", 2500);
        // this.alerta.showAlert(response.data.carrito[response.data.carrito.length-1].idProducto.nombre+" añadido", "success", 2500);
      }, reject => {
        this.alerta.showAlert(reject.error.message, "danger", 2500);
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
