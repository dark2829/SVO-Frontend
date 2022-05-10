import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../../../services/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  
  productos: any = {};
  public page: number = 1; 

  constructor(
    private router: Router,
    private producto: ProductosService
  ) { }

  ngOnInit(): void {
    this.producto.getAllProductos().subscribe(response => {
      this.productos = response; 
      console.log(response);
    });
  }

  registro(){
    this.router.navigate(['product-register'])
  }

  modify(){
    this.router.navigate(['product-modify'])
  }

}
