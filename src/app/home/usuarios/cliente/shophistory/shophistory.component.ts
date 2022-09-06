import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-shophistory',
  templateUrl: './shophistory.component.html',
  styleUrls: ['./shophistory.component.css']
})
export class ShophistoryComponent implements OnInit {
  //Variables 
  productosRecibidos: any = null;
  productosInProcess: any = null;
  productosCanceled: any = null;

  fecha = "12 de febrero de 2022";
  codigo = "abcdefgh";
  productos = "jabón roma";

  dia: any = ""; 


  constructor(
    private persona: PersonasService, 
    private router: Router, 
    private enlaces: EnlacesService,
    private token: TokenService, 
    private route: ActivatedRoute, //? Pasar info en liga
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.persona.historyBuy(parseInt(this.token.getID()), "Realizado").subscribe(response => {
      this.productosRecibidos = response.data;
    });
    this.persona.historyBuy(parseInt(this.token.getID()), "en proceso").subscribe(response => {
      this.productosInProcess = response.data;
    });
    this.persona.historyBuy(parseInt(this.token.getID()), "Cancelado").subscribe(response => {
      this.productosCanceled = response.data;
    });
    if(window.sessionStorage.getItem('Values') == '1'){
      window.sessionStorage.setItem('Values', '0');
      window.location.reload();
    }
  }

  datainfo = (event: Event, tipe: string) => {
    this.dia = (<HTMLInputElement>event.target).value;
    this.persona.historyFetch(parseInt(this.token.getID()), tipe, this.dia).subscribe(response => {
      switch(tipe){
        case 'Realizado': 
          this.productosRecibidos = response.data;
        break;
        case 'En proceso': 
          this.productosInProcess = response.data;
        break;
        case 'Cancelado': 
          this.productosCanceled = response.data;
        break;
      }
    });
  }

  solicitudCancelacion(){
    this.router.navigate(['cancel-request']);
  }

  formatearProductos(productos: any){
    let informacion: string = ""; 
    productos.forEach((product: any) => {
      informacion += `${product.idProducto.nombre.substring(0, 20)} x ${product.cantidad} $${product.precio_total}\n`
    });

    return informacion;
  }
}
