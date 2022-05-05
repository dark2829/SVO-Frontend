import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('alerta') alerta: ElementRef;

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
    if(
      this.formProducto.value.fcodProd != null &&
      this.formProducto.value.fname != null &&
      this.formProducto.value.fcategoria != null &&
      this.formProducto.value.fcantidad != null &&
      this.formProducto.value.fpCompra != null &&
      this.formProducto.value.fpVenta != null &&
      this.formProducto.value.fpDesc != null &&
      this.formProducto.value.fDescription != null &&
      this.formProducto.value.fcodProd != "" &&
      this.formProducto.value.fname != "" &&
      this.formProducto.value.fcategoria != "" &&
      this.formProducto.value.fcantidad != "" &&
      this.formProducto.value.fpCompra != "" &&
      this.formProducto.value.fpVenta != "" &&
      this.formProducto.value.fpDesc != "" &&
      this.formProducto.value.fDescription != "" 
    ){
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
        console.log("Error"+reject.error);
      });
    }else{
      this.errores("Todos los campos son requeridos", "danger");
    }
  }

  //? Estos metodos funcionan para mostrar las alertas
  public information(texto: string, tipo: string){
    //? Agregar opciones de mensajes en vista    
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong> redirigiendo a lista.
                          </div>
    `;
    setTimeout(() => {} , 1000);
  }

  public errores(texto: string, tipo: string){
    //? Agregar opciones de mensajes en vista    
    const alertas: any = this.alerta.nativeElement; 
    alertas.innerHTML = `
                          <div 
                          class="alert alert-${tipo} alert-dismissible" 
                          style=
                            "
                            position: fixed; top:25vh; right:0%;
                              
                            ">
                          <button id="cerrar" type="button" class="btn-close" data-bs-dismiss="alert"></button>
                          <strong>¡${texto}!</strong>
                          </div>
    `;
    setTimeout(() => {alertas.innerHTML = ""} , 2000);
  }
}
