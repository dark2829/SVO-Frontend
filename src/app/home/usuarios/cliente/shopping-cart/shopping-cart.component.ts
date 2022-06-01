import { Component, OnInit } from '@angular/core';
import { EnlacesService } from '../../../../services/enlaces.service';
import { PersonasService } from '../../../../services/personas.service';
import { TokenService } from '../../../../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  total: string; 
  tarjetas: any = {}; 
  directions: any = {};
  fCarrito: FormGroup;
  buttonActived: boolean = true; 
  dirToSend: number; 
  tarjetBuy: number;
  resDirection: any;
  tarjetBuyText: any;
  activeDirection: boolean = true;
  activeTarject: boolean = true;
  totalShop: number  = 0; 
  totalShopPlusEnvio: number  = 0; 
  activarDownload: boolean = false; 
  urlPedido: any = this.enlaces.API_ENLACE_PEDIDOS+this.enlaces.PEDIDOS_DOWNLOAD_PDF; 

  constructor(
    private enlaces: EnlacesService, 
    private persona: PersonasService, 
    private token: TokenService, 
    private formBuilder: FormBuilder, 
    private alerta: AlertaService
  ) { }

  ngOnInit() {  
    this.resDirection = "";
    this.tarjetBuyText ="";
    this.persona.getProduct(this.token.getID()).subscribe(response => {
      this.totalShop = response.data.pago_total;

      if(response.data.carrito.length != 0){
        if(response.data.carrito[0].cantidad == 0){
          this.buttonActived = true; 
        }else{
          this.buttonActived = false; 
        }
      }
    });
    this.fCarrito = this.formBuilder.group({
      pago:     [null,[Validators.required]],
      entrega:  [null,[Validators.required]],
      factura:  [null,[Validators.required]],
    });
    this.persona.getPerson(this.token.getID()).subscribe(response => {
      this.tarjetas = response.data.idPersona.tarjeta;
      this.directions = response.data.idPersona.direccion;
    });
  }

  selectDirection(id: number){
    this.dirToSend = id; 
    this.activeDirection = false;
  }

  selectTarject(id: number){
    this.tarjetBuy = id; 
    this.activeTarject = false;
  }

  directionToSend(id: number){
    this.persona.getPerson(this.token.getID()).subscribe(response => {      
      response.data.idPersona.direccion.forEach((direccion: any) => {
        if(direccion.id == id){
          this.resDirection = `Calle: ${direccion.calle},Colonia: ${direccion.colonia},CP: ${direccion.cp},Municipio: ${direccion.municipio}`
          console.log(this.resDirection)
        }
      });
    });
  }
  
  //FIXME: solo falta este para implementar en el envio
  tarjectToBuy(id: number){
    this.persona.getPerson(this.token.getID()).subscribe(response => {      
      response.data.idPersona.tarjeta.forEach((tarjeta: any) => {
        if(tarjeta.id == id){
          this.tarjetBuyText = `${tarjeta.numero}`
          console.log(this.tarjetBuyText)
        }
      });
    });
  }

  continieBuy(){
    this.persona.getProduct(this.token.getID()).subscribe(response => {
      if(response.data.carrito != null){
        //Verificar si no borro el unico producto que tenia
        if(response.data.carrito.length == 0){
          //No tiene ningun producto
          window.location.reload();
        }else{
          const tiempoTranscurrido = Date.now();
          const dia = new Date(tiempoTranscurrido);
          const fecha = dia.toLocaleDateString().replace(/\//g, '-');
          this.persona.saveVenta(parseInt(this.token.getID()), {
            "tipo_envio": this.fCarrito.value.entrega,
            "direccion": this.resDirection,
            "fecha_venta": fecha,
            "facturado": 1, 
            "tipo_pago":  this.fCarrito.value.pago,
            "tarjetaUtilizada": this.tarjetBuyText
          }).subscribe(response => {
            console.log(response);
            this.urlPedido += response.data.id;
            this.alerta.showAlert("Compra exitosa", "success", 2500);
            // setTimeout(() => {window.location.reload()} , 2500);
          }, reject => {
            console.log(reject);
          });
        }
      }else{
        // console.log("No hay productos en carrito");
      }
    }
    );

  }
}
