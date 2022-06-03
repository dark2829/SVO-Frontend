import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-pedido-request',
  templateUrl: './pedido-request.component.html',
  styleUrls: ['./pedido-request.component.css']
})
export class PedidoRequestComponent implements OnInit {
  
  fecha: any;
  codigoCompra: any; 
  productos: any = {}; //variable de comunicacion
  motivo: any; 
  pagototal: any; 

  formCanceled: FormGroup; 
  idPedido: any;
  urlMini: any; 
  correo: any; 

  soliSend: boolean = false; 
  respuesta: any = null; 

  constructor(
    private router: Router, 
    private enlaces: EnlacesService,
    private route: ActivatedRoute, //? Pasar info en liga
    private alerta: AlertaService, 
    private pedido: PedidosService, 
    private formBuilder: FormBuilder, 
    private domSanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot.params['id'].toString()
    this.urlMini = domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/productocancel/'+id);
   }

  ngOnInit(): void {
    this.pedido.getPedidoById(this.route.snapshot.params['id'].toString()).subscribe(response => {
      this.codigoCompra = response.data.idCompra.codigo_compra
      this.motivo = response.data.solicitudCancelacion.motivo_cancel;      
      this.pagototal = response.data.idCompra.pago_total;
      this.correo = response.data.idCompra.idUsuario.correo;
      this.idPedido = response.data.id;
      if(response.data.solicitudCancelacion != null){
        if(response.data.solicitudCancelacion.motivo_resp != null){
          this.soliSend = true; 
        }
        this.respuesta = response.data.solicitudCancelacion.motivo_resp;
      }
      console.log(response);
    })

    this.formCanceled = this.formBuilder.group({
      respuesta: [this.respuesta , [Validators.required]]
    });
  }

  sendresponse(respuesta: string){
    console.log(this.formCanceled.value.respuesta);
    if(respuesta == 'aprobado'){
      this.pedido.responseRequestCancel(this.route.snapshot.params['id'], {
        "motivo_res": this.formCanceled.value.respuesta,
        "estatus": "Aceptado"
      }).subscribe(response => {
        this.alerta.showAlert("Solicitud aprobada", "success", 2500);
        this.pedido.responseRequestCancelWhitEmail({
          "idPedido": this.idPedido,
          "mailTo": this.correo
        }).subscribe(response => {
          setTimeout(() => {this.alerta.showAlert("Correo enviado", "success", 2500)}, 2500);
          this.alerta.showAlert
        },reject => {
          setTimeout(() => {this.alerta.showAlert("Correo no enviado", "danger", 2500)}, 2500);
        });
        
        setTimeout(() => {this.router.navigate(['pedidos'])}, 5000);
      });
    }else{  
      this.pedido.responseRequestCancel(this.route.snapshot.params['id'], {
        "motivo_res": this.formCanceled.value.respuesta,
        "estatus": "Rechazado"//aceptado, rechazado
      }).subscribe(response => {
        this.alerta.showAlert("Solicitud Rechazada", "success", 2500);
        this.pedido.responseRequestCancelWhitEmail({
          "idPedido": this.idPedido,
          "mailTo": this.correo
        }).subscribe(response => {
          setTimeout(() => {this.alerta.showAlert("Correo enviado", "success", 2500)}, 2500);
          this.alerta.showAlert
        },reject => {
          setTimeout(() => {this.alerta.showAlert("Correo no enviado", "danger", 2500)}, 2500);
        });
        setTimeout(() => {this.router.navigate(['pedidos'])}, 5000);
      });
      setTimeout(() => {this.router.navigate(['pedidos'])}, 5000);
    }

  }
}
