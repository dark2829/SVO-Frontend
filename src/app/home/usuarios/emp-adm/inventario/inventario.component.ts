import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductosService } from '../../../../services/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  
  productos: any = {};
  infoProduct: any = null;
  public page: number = 1; 
  urlProd: any;

  constructor(
    private router: Router,
    private producto: ProductosService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.producto.getAllProductos().subscribe(response => {
      this.productos = response; 
    });
  }

  showProduct(producto: any){
    this.infoProduct = producto; 
    console.log(this.infoProduct);
    this.urlProd = this.domSanitizer.bypassSecurityTrustResourceUrl('http://localhost:4200/extendProduct/'+producto.id);
  }

  registro(){
    this.router.navigate(['product-register'])
  }

  modify(){
    this.router.navigate(['product-modify'])
  }

  regresarImg(b64: string){
    if(b64 == null){
      return null; 
    }else{
      return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + `${b64}`);
    }
  }

}
