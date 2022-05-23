import { Component, OnInit } from '@angular/core';
import { EnlacesService } from '../../../../services/enlaces.service';
import { PersonasService } from '../../../../services/personas.service';
import { TokenService } from '../../../../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  dirToSendText = "tienda"; 
  tarjetBuyText = "efectivo";
  activeDirection: boolean = true;
  activeTarject: boolean = true;

  constructor(
    private enlaces: EnlacesService, 
    private persona: PersonasService, 
    private token: TokenService, 
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit() {  
    this.persona.getProduct(this.token.getID()).subscribe(response => {
      if(response.data.carrito[0].cantidad == 0){
        this.buttonActived = true; 
      }else{
        this.buttonActived = false; 
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
    console.log("Direccion a enviar: ", id);
  }

  tarjectToBuy(id: number){
    console.log("Direccion a enviar: ", id);
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
            "tipo_envio": this.tarjetBuyText,
            "direccion": this.dirToSendText,
            "fecha_venta": fecha,
            "facturado": 1
          }).subscribe(response => {
            console.log(response);
          }, reject => {
            console.log(reject);
          });
        }
      }else{
        console.log("No hay produyctos en carrito");
      }
    }
    );

  }

}
