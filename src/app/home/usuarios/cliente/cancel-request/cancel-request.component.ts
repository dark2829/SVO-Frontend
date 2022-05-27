import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PersonasService } from 'src/app/services/personas.service';
import { TokenService } from 'src/app/services/token.service';
import { PedidosService } from '../../../../services/pedidos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cancel-request',
  templateUrl: './cancel-request.component.html',
  styleUrls: ['./cancel-request.component.css']
})
export class CancelRequestComponent implements OnInit {
  
  fecha: any;
  codigoCompra: any; 
  productos: any = {}; //variable de comunicacion

  formCanceled: FormGroup; 
  idPedido: any;
  urlMini: any; 
  constructor(
    private persona: PersonasService, 
    private router: Router, 
    private enlaces: EnlacesService,
    private token: TokenService, 
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
      let motivo = response.data.solicitudCancelacion.motivo_cancel;      

      this.formCanceled = this.formBuilder.group({
        codigo: [this.codigoCompra, [Validators.required]],
        mensaje: [motivo, [Validators.required]]
      });
    })
  } 

  realizarSolicitud(){
    this.pedido.requestCanceled(this.route.snapshot.params['id'].toString(), {
      "motivoCancelacion": this.formCanceled.value.mensaje
    }).subscribe(response => {
      console.log(response)
    });
  }

  regresar(){
    this.router.navigate(['shopHistory']);
  }

}