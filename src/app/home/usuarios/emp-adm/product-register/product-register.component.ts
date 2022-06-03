import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';
import { AlertaService } from '../../../../services/alerta.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  formProducto: FormGroup;
  fileChange: boolean = false;
  preView: string;  
  img: any; 
  codigo_producto: any;
  tipImage: any;

  constructor(
    private productos: ProductosService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService,
    private token: TokenService, 
    private sanitizer: DomSanitizer,    //? Convertir a base64 y -> viceversa
    private alerta: AlertaService
  ) { }

  zfill(numero: number, tamaño: number) {
    var numberOutput = Math.abs(numero); /* Valor absoluto del número */
    var length = numero.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (tamaño <= length) {
      if (numero < 0) {
        return ("-" + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (numero < 0) {
        return ("-" + (zero.repeat(tamaño - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(tamaño - length)) + numberOutput.toString());
      }
    }
  }

  ngOnInit(): void {
    this.tipImage = "Se recomienda que las imágenes sean png con una dimencion de 1540x1830"
    if (this.token.getToken()) {
      this.productos.getAllProductos().subscribe(response => {
        let cantidad = response.data.length;
        this.codigo_producto = parseInt(response.data[cantidad-1].codigo_prod)+1;
        this.codigo_producto = this.zfill(this.codigo_producto, 9);
      })
      this.formProducto = this.formBuilder.group({
        fcodProd:     [this.codigo_producto, [Validators.required, Validators.maxLength(9), Validators.maxLength(9)]],
        fname:        [null, [Validators.required]],
        fcategoria:   [null, [Validators.required]],
        fcantidad:    [null, [Validators.required, Validators.min(0)]],
        fpCompra:     [null, [Validators.required, Validators.min(0.00)]],
        fpVenta:      [null, [Validators.required, Validators.min(0.00)]],
        fpDesc:       [null, [Validators.required, Validators.min(0.00)]],
        fDescription: [null, [Validators.required]],
        festado:      [null, []]
      })
    } else {
      console.log("No hay token");
    }
  }

  load(){
    const loadProductos = this.enlaces.API_ENLACE_PRODUCTOS + this.enlaces.PRODUCTO_INSERT
    if(this.formProducto.valid == true){
      if (
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
      ) {      
        this.productos.saveProducto(loadProductos, {
          codigo_prod: this.codigo_producto,
          imagen: this.img ,
          nombre: this.formProducto.value.fname,
          categoria: this.formProducto.value.fcategoria,
          cantidad: this.formProducto.value.fcantidad,
          precio_compra: this.formProducto.value.fpCompra,
          precio_venta: this.formProducto.value.fpVenta,
          precio_descuento: this.formProducto.value.fpDesc,
          descripcion: this.formProducto.value.fDescription,
          estatus: 'Disponible'
        }).subscribe(response => {
          this.alerta.showAlert(response.message, "success", 2000);
          setTimeout(() => { this.router.navigate(['inventario']); }, 2100);
        }, 
        reject => {
          this.alerta.showAlert(reject.error.message, "danger", 2500, reject.status)
        });
      }else{
        this.alerta.showAlert("Todos los campos son requeridos", "danger", 2500)
      }
    }else{
      this.alerta.showAlert("Algunos campos no son validos", "danger", 2000);
    }
  }
  
  cancel(){
    this.alerta.showAlert("Cancelado", "secondary", 2000)
    setTimeout(() => { this.router.navigate(['inventario']); }, 2100);
  }

  public capturarArchivo(event: any): any{
    const archivoCapturado = event.target.files[0];
    this.fileChange = true; 
    this.extraerB64(archivoCapturado).then((imagen: any) => {
      this.preView = imagen.base;
      this.img = imagen.base.split(',')[1];      
    })
  }
  
  extraerB64 = async ($event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }

    }catch(ex){
      console.log(ex);
    }
  })

}