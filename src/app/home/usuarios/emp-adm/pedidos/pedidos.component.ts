import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { FormGroup, Validators } from '@angular/forms';
import { AlertaService } from '../../../../services/alerta.service';
import { TokenService } from '../../../../services/token.service';

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
  user: string ; 
  constructor(
    private router: Router,
    private pedido: PedidosService, 
    private alerta: AlertaService,
    public token: TokenService

  ) { }

  ngOnInit(): void {
    this.pedido.getAllPedidos().subscribe(response => {
      this.pedidos = response; 
      console.log(response);
    });

  }

  retornarDireccion(texto: string){
    let textoRetornar = texto.replace("Calle: ", "");
    textoRetornar = textoRetornar.substring(0, textoRetornar.indexOf(","));
    return textoRetornar;
  }
  
  cancelacion(idCompra: string, tipoUser: string){
    if(tipoUser.includes('Administrador')){
      this.router.navigate(['cancel/'+idCompra]);
    }else{
      this.alerta.showAlert("No tienes permisos para cancelar pedidos", "warning", 2000);
    }
  }

  retornarStatus(idPedido: string, evento: any){
    this.pedido.updateSatus(idPedido, evento).subscribe(response => {
      this.alerta.showAlert("Status de pedido actualizado", "success", 2000);
      setTimeout(() => {window.location.reload() }, 1000);
    });
    console.log(evento);
  }

  tipeSend(tipe: string){
    if(tipe == 'all'){
      this.pedido.getAllPedidos().subscribe(response => {
        this.pedidos = response; 
        this.alerta.showAlert(`Mostrando todos los pedidos`, "secondary", 2000)
      });
    }else{
      this.pedido.findTypePedido(tipe).subscribe(response => {
        this.pedidos = response; 
        this.alerta.showAlert(`Mostrar pedidos de tipo envió: ${tipe}`, "secondary", 2000)
      });
    }
  }
}
