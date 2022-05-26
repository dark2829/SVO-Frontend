import { Component, Input, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/services/alerta.service';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-prodtocancel',
  templateUrl: './prodtocancel.component.html',
  styleUrls: ['./prodtocancel.component.css']
})
export class ProdtocancelComponent implements OnInit {

  productos: any = {};

  constructor(
    private enlaces: EnlacesService,
    private alerta: AlertaService, 
    private pedido: PedidosService, 
  ) { }

  ngOnInit(): void {
    this.pedido.getPedidoById("1").subscribe();
  }

}
