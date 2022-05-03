import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from '../../../../services/enlaces.service';

@Component({
  selector: 'app-product-modify',
  templateUrl: './product-modify.component.html',
  styleUrls: ['./product-modify.component.css']
})
export class ProductModifyComponent implements OnInit {
  
  codigoProducto: string; 
  nombre: string; 
  categoria: string; 
  cantidad: number; 
  pcompra: number; 
  pventa: number; 
  pdesc: number; 
  description: string; 
  estado: string; 

  @ViewChild('alerta') alerta: ElementRef;

  index: number | undefined; 
  formProducto: FormGroup;

  constructor(
    private productos: ProductosService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService
  ) { }
  
  // Cargar datos al form
  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'];
    this.productos.getAllProductos().subscribe(response => {
      response.forEach((item: any) => {
        if(item.id == this.index){
          this.codigoProducto = item.codigo_prod; 
          this.nombre = item.nombre;
          this.categoria = item.categorita;
          this.cantidad = item.cantidad;
          this.pcompra = item.precio_compra;
          this.pventa = item.precio_venta;
          this.pdesc = item.precio_descuento;
          this.description = item.descripcion;
          this.estado = item.estatus;

          this.formProducto = this.formBuilder.group({
            fcodProd: [item.codigo_prod, [Validators.required]], 
            fname:  [item.nombre , [Validators.required]],
            fcategoria: [item.categorita , [Validators.required]], 
            fcantidad: [item.cantidad , [Validators.required]], 
            fpCompra: [item.precio_compra , [Validators.required]],
            fpVenta: [item.precio_venta , [Validators.required]],
            fpDesc: [item.precio_descuento , [Validators.required]],
            fDescription: [item.descripcion , [Validators.required]],
            festado: [item.estatus , [Validators.required]]
          })
        }
      })
    });
  }
  // Actualizar datos
  public update(){
    const enviarActualizacion = this.enlaces.API_ENLACE_PRODUCTOS + this.enlaces.PRODUCTO_UPDATE+this.index
        this.productos.updateProducto(enviarActualizacion, {
          codigo_prod: "a",
          nombre: "a",
          categoria: "a",
          cantidad: "a",
          precio_compra: "a",
          precio_venta: "a",
          precio_descuento: "a",
          desc: "a",
          estatus: "a"

        });
        console.log("enviar");
    /* try{
      if(
        this.formProducto.value.fname != null &&
        this.formProducto.value.fcategoria != null &&
        this.formProducto.value.fcantidad != null &&
        this.formProducto.value.fpCompra != null &&
        this.formProducto.value.fpVenta != null &&
        this.formProducto.value.fpDesc != null &&
        this.formProducto.value.fDescription != null &&
        this.formProducto.value.festado != null &&
        this.formProducto.value.fname != "" &&
        this.formProducto.value.fcategoria != "" &&
        this.formProducto.value.fcantidad != "" &&
        this.formProducto.value.fpCompra != "" &&
        this.formProducto.value.fpVenta != "" &&
        this.formProducto.value.fpDesc != "" &&
        this.formProducto.value.fDescription != "" &&
        this.formProducto.value.festado != ""
        ){
          const enviarActualizacion = this.enlaces.API_ENLACE_PRODUCTOS + this.enlaces.PRODUCTO_UPDATE+this.index
        this.productos.updateProducto(enviarActualizacion, {
          codigo_prod: this.formProducto.value.fcodProd, 
          nombre: this.formProducto.value.fname, 
          categoria: this.formProducto.value.fcategoria, 
          cantidad: this.formProducto.value.fcantidad, 
          precio_compra: this.formProducto.value.fpCompra, 
          precio_venta: this.formProducto.value.fpVenta, 
          precio_descuento: this.formProducto.value.fpDesc, 
          desc: this.formProducto.value.fDescription, 
          estatus: this.formProducto.value.festado

        });
      }
    }catch(error){
      alert(error);
    } */
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
