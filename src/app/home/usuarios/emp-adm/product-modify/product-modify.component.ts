import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnlacesService } from '../../../../services/enlaces.service';
import { TokenService } from 'src/app/services/token.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertaService } from '../../../../services/alerta.service';

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

  fileChange: boolean = false;
  preView: any;
  img: any;

  index: string;
  formProducto: FormGroup;
  tipImage: string;

  constructor(
    private productos: ProductosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private enlaces: EnlacesService,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer, 
    private alerta: AlertaService
  ) { }

  // Cargar datos al form
  ngOnInit(): void {
    this.formProducto = this.formBuilder.group({
      fcodProd:     [null, [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      fname:        [null, [Validators.required]],
      fcategoria:   [null, [Validators.required]],
      fcantidad:    [null, [Validators.required, Validators.min(0)]],
      fpCompra:     [null, [Validators.required, Validators.min(0.00)]],
      fpVenta:      [null, [Validators.required, Validators.min(0.00)]],
      fpDesc:       [null, [Validators.required, Validators.min(0.00)]],
      fDescription: [null, [Validators.required]],
      festado:      [null, [Validators.required]]
    }); 

    this.tipImage = "Se recomienda que las imágenes sean png con una dimencion de 1540x1830";
    if (this.tokenService.getToken()) {
      this.index = this.route.snapshot.params['id'].toString();
      
      this.productos.getProductID(this.index).subscribe(async response => {
        this.codigoProducto = response.data.codigo_prod;
        if (response.data.imagen != null) {
          this.fileChange = true;
          this.preView = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
          + response.data.imagen)
          this.img = response.data.imagen;
        }
        this.nombre = response.data.nombre;
        this.categoria = response.data.categoria;
        this.cantidad = response.data.cantidad;
        this.pcompra = response.data.precio_compra;
        this.pventa = response.data.precio_venta;
        this.pdesc = response.data.precio_descuento;
        this.description = response.data.descripcion;
        this.estado = response.data.estatus;
        this.formProducto.patchValue({
            fcodProd:     this.codigoProducto, 
            fname:        this.nombre,         
            fcategoria:   this.categoria,      
            fcantidad:    this.cantidad,       
            fpCompra:     this.pcompra,        
            fpVenta:      this.pventa,         
            fpDesc:       this.pdesc,          
            fDescription: this.description,    
            festado:      this.estado
          });
      });
      
    } else {
      console.log("No hay token");
    }
  }
  // Actualizar datos
  public update() {
    const enviarActualizacion = this.enlaces.API_ENLACE_PRODUCTOS + this.enlaces.PRODUCTO_UPDATE + this.index
    if(this.formProducto.valid == true){
      this.productos.updateProducto(enviarActualizacion, {
        codigo_prod: this.formProducto.value.fcodProd,
        imagen: this.img,
        nombre: this.formProducto.value.fname.trimStart(),
        categoria: this.formProducto.value.fcategoria,
        cantidad: this.formProducto.value.fcantidad,
        precio_compra: this.formProducto.value.fpCompra,
        precio_venta: this.formProducto.value.fpVenta,
        precio_descuento: this.formProducto.value.fpDesc,
        descripcion: this.formProducto.value.fDescription,
        estatus: this.formProducto.value.festado
  
      }).subscribe(response => {
        this.alerta.showAlert(response.message, "success", 2000);
        setTimeout(() => { this.router.navigate(['inventario']); }, 2100);
      },
      reject => {
        this.alerta.showAlert(reject.error.message, "warning", 2000, reject.status);
        });
    }else{
      this.alerta.showAlert("Algunos datos no son correctos", "danger", 2000);
    }
  }

  cancel(){
    this.alerta.showAlert("Cancelado", "secondary", 2000);
    setTimeout(() => { this.router.navigate(['inventario']); }, 2100);
  }

  public capturarArchivo(event: any): any {
    this.img = null; 
    const archivoCapturado = event.target.files[0];
    this.fileChange = true;
    this.extraerB64(archivoCapturado).then((imagen: any) => {
      this.preView = imagen.base;
      this.img = imagen.base.split(',')[1];
    })
  }

  extraerB64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        })
      }

    } catch (ex) {
      console.log(ex);
    }
  })
}
