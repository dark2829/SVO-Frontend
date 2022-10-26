import { HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  
  productos: any = {};
  public page: number = 1; 

  constructor(
    private token: TokenService, 
    private router: Router,
    private producto: ProductosService,
    private alerta: AlertaService
  ) { }

  ngOnInit(): void {    
    this.producto.alertProducts().subscribe(response => {
      this.productos = response.data;
    });
  }

  contactado(idProducto: string){
    this.producto.alertProductsContact(idProducto).subscribe(response => {
      this.alerta.showAlert("La alerta se eliminara hasta que el stock sea mayor a 5", "success", 3000);
      setTimeout(() => { window.location.reload(); }, 2500);      
    });
  }

}
