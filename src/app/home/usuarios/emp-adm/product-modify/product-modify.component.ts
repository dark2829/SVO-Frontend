import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from '../../../../services/enlaces.service';
import { TokenService } from 'src/app/services/token.service';

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

  index: string; 
  formProducto: FormGroup;

  constructor(
    private productos: ProductosService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService,
    private tokenService: TokenService
  ) { }
  
  // Cargar datos al form
  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.index = this.route.snapshot.params['id'].toString();

      let cateNumber: number;
      this.productos.getProductID(this.index).subscribe(response => {
          this.codigoProducto = response.data.codigo_prod;
          this.nombre = response.data.nombre;
          this.categoria = response.data.categoria;
          this.cantidad = response.data.cantidad;
          this.pcompra = response.data.precio_compra;
          this.pventa = response.data.precio_venta;
          this.pdesc = response.data.precio_descuento;
          this.description = response.data.descripcion;
          this.estado = response.data.estatus;
        
          this.formProducto = this.formBuilder.group({
            fcodProd: [response.data.codigo_prod, [Validators.required]],
            fname: [response.data.nombre, [Validators.required]],
            fcategoria: [response.data.categoria, [Validators.required]],
            fcantidad: [response.data.cantidad, [Validators.required]],
            fpCompra: [response.data.precio_compra, [Validators.required]],
            fpVenta: [response.data.precio_venta, [Validators.required]],
            fpDesc: [response.data.precio_descuento, [Validators.required]],
            fDescription: [response.data.descripcion, [Validators.required]],
            festado: [response.data.estatus, []]
          })
        });
      }else{
        console.log("No hay token");
      }
  }
  // Actualizar datos
  public update(){
    const enviarActualizacion = this.enlaces.API_ENLACE_PRODUCTOS + this.enlaces.PRODUCTO_UPDATE+this.index
        this.productos.updateProducto(enviarActualizacion, {
          codigo_prod: this.formProducto.value.fcodProd,
          nombre: this.formProducto.value.fname,
          categoria: this.formProducto.value.fcategoria,
          cantidad: this.formProducto.value.fcantidad,
          precio_compra: this.formProducto.value.fpCompra,
          precio_venta: this.formProducto.value.fpVenta,
          precio_descuento: this.formProducto.value.fpDesc,
          descripcion: this.formProducto.value.fDescription,
          estatus: this.formProducto.value.festado

        }).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
        console.log(this.formProducto.value);
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
