import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { EnlacesService } from 'src/app/services/enlaces.service';
import { ProductosService } from 'src/app/services/productos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productInfo: any = {};
  index: string; 
  formProductoExtend: FormGroup;

    constructor(
    private router: Router, //usa un servicio router 
    private enlaces: EnlacesService,
    private producto: ProductosService,
    private sanitizer: DomSanitizer,
    private token: TokenService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.index = this.route.snapshot.params['id'].toString();

    if(this.token.getToken()){
      this.producto.getProductID(this.index).subscribe(response => {
        this.productInfo = response.data;

        this.formProductoExtend = this.formBuilder.group({
          cantidad: [null]
        });
      });
    }
  }

  login(){
    this.router.navigate(['login']);//agregamos la ruta con el nombre especificado en app-routing.module.ts
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
