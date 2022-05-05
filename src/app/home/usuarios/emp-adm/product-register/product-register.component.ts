import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  formProducto: FormGroup; 

  constructor(
    private productos: ProductosService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService,
    private token: TokenService
  ) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.formProducto = this.formBuilder.group({
        fcodProd: [null, [Validators.required]],
        fname: [null, [Validators.required]],
        fcategoria: [null, [Validators.required]],
        fcantidad: [null, [Validators.required]],
        fpCompra: [null, [Validators.required]],
        fpVenta: [null, [Validators.required]],
        fpDesc: [null, [Validators.required]],
        fDescription: [null, [Validators.required]],
        festado: [null, []]
      })
    } else {
      console.log("No hay token");
    }
  }

  load(){
    const loadProductos = this.enlaces.API_ENLACE_PRODUCTOS + this.enlaces.PRODUCTO_INSERT
    this.productos.saveProducto(loadProductos, {
      codigo_prod: this.formProducto.value.fcodProd,
      nombre: this.formProducto.value.fname,
      categoria: this.formProducto.value.fcategoria,
      cantidad: this.formProducto.value.fcantidad,
      precio_compra: this.formProducto.value.fpCompra,
      precio_venta: this.formProducto.value.fpVenta,
      precio_descuento: this.formProducto.value.fpDesc,
      descripcion: this.formProducto.value.fDescription,
      estatus: 'Disponible'
    }).subscribe(response => {
      console.log("Respuesta"+response);
    }, 
    reject => {
      console.log("Error"+reject);
    });
  }
}
