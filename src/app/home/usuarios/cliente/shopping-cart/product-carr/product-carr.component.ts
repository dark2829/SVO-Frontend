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
    this.persona.getProduct().subscribe(response => {
      this.productosAgregados = response.carrito;
      response.carrito.forEach((element:any) => {
        this.total += element.cantidad* element.idProducto.precio_venta
      })
      this.persona.mostrarTotal(this.total.toString());
    }); 
  }

  deleteGroup(id: string){
    this.persona.deleteOneGroup(id).subscribe(response => {
      window.location.reload()
    });
  }

  addOneProduct(idParam: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+1;
    this.persona.addShopingCar(API_CARR, {
      id: idParam,
      cantidad: 1
    }).subscribe(response => {
      window.location.reload();
      this.alerta.showAlert(response.idProducto.nombre+" añadido", "success", 2500);
    }, reject => {
      this.alerta.showAlert("Error al añadir a carrito", "danger", 2500);
    });
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
