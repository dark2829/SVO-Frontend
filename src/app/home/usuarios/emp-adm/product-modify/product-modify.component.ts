import { Component, OnInit } from '@angular/core';
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

  index: number | undefined; 
  formProducto: FormGroup;

  constructor(
    private productos: ProductosService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private enlaces: EnlacesService
  ) { }

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

}
