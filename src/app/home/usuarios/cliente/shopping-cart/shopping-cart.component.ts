import { Component, HostListener, OnInit } from '@angular/core';
import { EnlacesService } from '../../../../services/enlaces.service';
import { PersonasService } from '../../../../services/personas.service';
import { TokenService } from '../../../../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertaService } from '../../../../services/alerta.service';
import { ComunicacionService } from '../../../../services/comunicacion.service';
import { ProductosService } from 'src/app/services/productos.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  compra: boolean = false; 


  productosAgregados: any = {};
  total2: number; 
  idUsuario = this.token.getID();

  constructor(
    private enlaces: EnlacesService, 
    private persona: PersonasService, 
    private token: TokenService, 
    private formBuilder: FormBuilder, 
    private alerta: AlertaService, 
    private comunication: ComunicacionService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer, 
  ) { }


  ngOnInit() {  
    this.resDirection = "";
    this.tarjetBuyText ="";

    this.persona.getProduct(this.token.getID()).subscribe(response => {
      this.productosAgregados = response.data.carrito;
    });

    this.productosAgregados = Object.values(this.productosAgregados);
    
    this.comunication.enviarMensajeObservable.subscribe(response => {
      this.totalShop = parseInt(response); 
    })

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

  returnFalse(){
    this.activarDownload = false; 
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


  deleteGroup(idProducto: string, idUsuario: string){
    this.persona.deleteOneGroup(idProducto, idUsuario ).subscribe(response => {
      this.persona.getProduct(this.token.getID()).subscribe(response => {
        this.productosAgregados = response.data.carrito;
        this.comunication.enviarMensaje(response.data.pago_total); 
      })
      window.location.reload()
    });
  }
  
  //Suma uno
  addOneProduct(idParam: number, cantidad: number){
    const API_CARR = this.enlaces.API_ENLACE_CARRITO+this.enlaces.CARRITO_INSERT+idParam+this.enlaces.CARRITO_INSERT_C+1+this.enlaces.CARRITO_PandU+this.token.getID();
    this.persona.addShopingCar(API_CARR, {
      id: idParam,
      cantidad: 1
    }).subscribe(response => {
      this.persona.getProduct(this.token.getID()).subscribe(response => {
        this.productosAgregados = response.data.carrito;
        this.comunication.enviarMensaje(response.data.pago_total); 
      })
      window.location.reload();
      this.alerta.showAlert(response.idProducto.nombre+" añadido", "success", 2500, "400");
    }, reject => {
      this.alerta.showAlert(reject.error.message, "danger", 2500);
    });
  }
  
  //resta uno
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
        this.persona.getProduct(this.token.getID()).subscribe(response => {
          this.productosAgregados = response.data.carrito;
          this.comunication.enviarMensaje(response.data.pago_total); 
        })
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
  
  activeDirectionradio(){
    this.fCarrito = this.formBuilder.group({
      pago:     ['efectivo',[Validators.required]],
      entrega:  [this.fCarrito.value.entrega,[Validators.required]],
      factura:  [this.fCarrito.value.factura,[Validators.required]],
    })
  }
  activeDirectionradio2(){
    this.fCarrito = this.formBuilder.group({
      pago:     [this.fCarrito.value.pago ,[Validators.required]],
      entrega:  ['Tienda',[Validators.required]],
      factura:  [this.fCarrito.value.factura,[Validators.required]],
    })
  }
}
