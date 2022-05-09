import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { EnlacesService } from '../services/enlaces.service';
import { ProductosService } from '../services/productos.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productos: any = {
  };
  fileChange: boolean [];
  preView: any;
  img: any;
  
  index: number; 
  
  constructor(
    private router: Router, //usa un servicio router 
    private route: ActivatedRoute, // Usa el servicio de route para obtener informacion de la ruta
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer
    
  ){

  }

  ngOnInit(): void {
    this.producto.getAllProductos().subscribe(response => {
      this.productos = response.data;
    });
    this.index = this.route.snapshot.params['id'];
  }

  regresarImg(b64: string){
    if(b64 == null){
      return null; 
    }else{
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + `${b64}`);
    }
  }
}