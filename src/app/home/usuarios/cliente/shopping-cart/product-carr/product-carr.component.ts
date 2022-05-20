import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeComponent } from 'src/app/home/home.component';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-carr',
  templateUrl: './product-carr.component.html',
  styleUrls: ['./product-carr.component.css']
})
export class ProductCarrComponent implements OnInit {

  productosAgregados: any = {};
  total: number; 
  idUsuario = this.token.getID();

  constructor(
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer, 
    private persona: PersonasService,
    private alerta: AlertaService,
    private token: TokenService,
  ) { }

  ngOnInit(): void {
    this.total = 0; 
    this.persona.getProduct(this.token.getID()).subscribe(response => {
      this.productosAgregados = response.data.carrito;
      console.log(response);
    }); 
  }

  deleteGroup(idProducto: string, idUsuario: string){
    console.log("id usuario", idUsuario);
    this.persona.deleteOneGroup(idProducto, idUsuario ).subscribe(response => {
      window.location.reload()
    });
  }

  addOneProduct(idParam: number, cantidad: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+1+this.enlaces.CARRITO_PandU+this.token.getID();
    this.persona.addShopingCar(API_CARR, {
      id: idParam,
      cantidad: 1
    }).subscribe(response => {
      window.location.reload();
      this.alerta.showAlert(response.idProducto.nombre+" añadido", "success", 2500, "400");
    }, reject => {
      this.alerta.showAlert(reject.error.message, "danger", 2500);
    });
  }

  actualizarCantidad(idProducto: string, cantidad: number) {
    let idProd = parseInt(idProducto);
    let idUsuario = this.token.getID();
    if (cantidad == 1) {
      this.deleteGroup(idProducto, idUsuario);
    } else {
      const API_REDUCE_ONE = this.enlaces.API_ENLACE_CARRITO + this.enlaces.CARRITO_UPDATE + idProducto + this.enlaces.CARRITO_INSERT_C + (cantidad - 1)+this.enlaces.CARRITO_PandU+this.token.getID();
      this.persona.deleteOneProductOfGroup(API_REDUCE_ONE, {
        idProducto: idProd,
        cantidad: 2
      }).subscribe(response => {
        window.location.reload();
      }, reject => {
        this.alerta.showAlert(reject.message, "danger", 2500)
      });
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
