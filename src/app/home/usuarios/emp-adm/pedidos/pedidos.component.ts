import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  id = 1;  
  selectStatus: any;
  page: number = 1; 
  pedidos: any = {};
  constructor(
    private router: Router,
    private pedido: PedidosService, 

  ) { }

  ngOnInit(): void {
    this.pedido.getAllPedidos().subscribe(response => {
      this.pedidos = response; 
      console.log(this.pedidos)
    });

  }

  retornarDireccion(texto: string){
    let textoRetornar = texto.replace("Calle: ", "");
    textoRetornar = textoRetornar.substring(0, textoRetornar.indexOf(","));
    return textoRetornar;
  }
  
  cancelacion(){
    this.router.navigate(['cancel']);
  }

  retornarStatus(evento: any){
    //FIXME: relizar funcion para modificar el estatus del pedido
    console.log(evento);
  }
}
