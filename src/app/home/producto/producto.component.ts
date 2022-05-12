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
  index: string; 
  formProductoExtend: FormGroup;

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

        this.formProductoExtend = this.formBuilder.group({
          cantidad: [1]
        });
      });
    }
  }

  like(id: number){
    //FIXME: falta implementar el metodo de agregar y eliminar de likes
    const likeId = document.getElementsByClassName("buttonLike");
    if(likeId[0].classList.contains("lineaBlanca")){
      //? no se manda el metodo 
      likeId[0].classList.remove("bg-danger", "text-white", "lineaBlanca"); 
      console.log("Quitando clase namas y quito de favoritos");
    }else{
      //? se manda el metodo de agregar a fsavoritos 
      console.log("Mando a favoritos");
      likeId[0].classList.add("bg-danger", "text-white", "lineaBlanca");
    }
  }

  addCarrito(idParam: number, cantidad: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+cantidad;
    if(this.token.getToken() != null){
      this.persona.addShopingCar(API_CARR, {
        id: idParam,
        cantidad: 1
      }).subscribe(response => {
        console.log(response);
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
