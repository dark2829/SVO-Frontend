import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carta-producto',
  templateUrl: './carta-producto.component.html',
  styleUrls: ['./carta-producto.component.css']
})
export class CartaProductoComponent {
  
  constructor(
    private router:Router
  ){

  }
  buynow(){
    this.router.navigate(['buynow'])
  }
}
