import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  fecha: any = {};

  constructor(
    private enlaces: EnlacesService,
    private alerta: AlertaService, 
    private pedido: PedidosService, 
    private route: ActivatedRoute, //? Pasar info en liga

  ) { }

  ngOnInit(): void {
    this.pedido.getPedidoById(this.route.snapshot.params['id'].toString()).subscribe(response => {
      this.productos = response.data.idCompra.carrito; 
      this.fecha = response.data.fecha_entrega; 
      console.log(this.productos)
    });
  }

}
